const express = require('express');
const path = require('path');
require('dotenv').config()
const session = require('express-session');
const encryptString = require('./helpers/encryptString.js').encryptString;
const getLevelData = require('./client/src/levels/index.js').getLevelData;
const firstLevelName = require('./client/src/levels/index.js').firstLevelName;
const firstLevelId = require('./client/src/levels/index.js').firstLevelId;

const app = express();
const { MongoClient } = require('mongodb');

//Connect to database
var dbClient = new MongoClient(
	`mongodb+srv://Admin:GFZ4pTNUbF6g3Ut1@cluster0.cf0lh.mongodb.net/cluster0?retryWrites=true&w=majority`
	, { useNewUrlParser: true, useUnifiedTopology: true });

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.json());
app.use(session({
	secret: 'mUCHDFMShcuoifmhcsdpmcMDPismpicds'
	, saveUninitialized: true,
	resave: false,
	cookie: {
		httpOnly: true,
		maxAge: 60 * 60 * 1000
	}
}));
app.use((req, res, next) => {
	console.log(req.session);
	next();
})

dbClient.connect().then(function () {
	const collection = dbClient.db("Dev").collection("Dev");

	app.post("/api/auth", async (req, res) => {
		const { username, password } = req.body;
		//Get credentials from request

		const user = await collection.findOne({
			username: username
		});
		//Find user from database

		if (!user) {
			//If user doesnt exist, error
			return res.status(403).json({
				message: 'Wrong email or password.'
			}
			)
		}

		//If passwords dont match...
		if (encryptString(password) != user.password) {
			//Error
			return res.status(403).json({ message: "Incorrect password" });
		}

		//Set session for user to keep logged in
		let userInfo = Object.assign({}, { ...user });
		userInfo.password = undefined;

		req.session.user = userInfo;
		res.status(200).json({ message: "Signin successful" })
	});

	app.get("/api/authed", requireAuth, () => { res.status(200); });
	app.get("/api/logout", requireAuth, (req, res) => {
		//Logout user
		req.session.destory();
	})

	app.post("/api/createUser", async (req, res) => {
		const { username, password } = req.body;
		const user = await collection.findOne({
			username: username
		});

		if (!user) {
			//Create an insert a new user into the database
			let levelData = {};
			levelData[firstLevelId()] = {
				name: firstLevelName(),
				stars: 0,
				infoRead: 0,
				mcQuestions: { failed: false, finished: false },
				openQuestions: { failed: false, finished: false }
			}

			await collection.insertOne({
				username: username,
				password: encryptString(password),
				levels: levelData,
				stars: 0
			});
			res.status(200).json({
				message: "Account created"
			})
		} else {
			//Account already exists
			return res.status(409).json({
				message: 'Account with that email already exists'
			}
			)
		}
	});
	app.post("/api/unlockLevel", requireAuth, async (req, res) => {

		//Get user from db
		let userObject = await collection.findOne({ username: req.session.user.username });
		let level = getLevelData(req.body.id);

		let newLevelValue = {
			name: level.title,
			stars: 0,
			infoRead: 0,
			mcQuestions: { failed: false, finished: false },
			openQuestions: { failed: false, finished: false }
		}
		userObject.levels[req.body.id] = newLevelValue;
		//Unlock level for user
		await collection.updateOne({ username: req.session.user.username }, { $set: { levels: userObject.levels } });
		return res.status(200);
	});

	app.post("/api/finishSection", requireAuth, async (req, res) => {
		let userObject = await collection.findOne({ username: req.session.user.username });

		//Check that user hasnt failed section
		if (req.body.mode == "info") {
			userObject.levels[req.body.id].infoRead = true;
		} else if (req.body.mode == "multi") {
			let failedMulti = userObject.levels[req.body.id].mcQuestions.failed;
			console.log(failedMulti, req.body.attemptNumber, req.body.id, req.body.mode);
			if (failedMulti && failedMulti == req.body.attemptNumber) {
				return res.send("failed");
			};
			userObject.levels[req.body.id].mcQuestions.finished = true;
			userObject.levels[req.body.id].mcQuestions.failed = false;
		} else if (req.body.mode == "open") {
			let failedOpen = userObject.levels[req.body.id].openQuestions.failed;
			if (failedOpen && failedOpen == req.body.attemptNumber) {
				return res.send("failed");
			};
			userObject.levels[req.body.id].openQuestions.finished = true;
			userObject.levels[req.body.id].openQuestions.failed = false;
		}
		//Update user object
		await collection.updateOne({ username: req.session.user.username }, { $set: { levels: userObject.levels } });
		return res.status(200);
	});

	app.post("/api/failSection", requireAuth, async (req, res) => {

		//Fail user section
		let userObject = await collection.findOne({ username: req.session.user.username });
		if (req.body.mode == "multi") {
			if (userObject.levels[req.body.id].mcQuestions.finished) {
				//Dont let user fail a section they already finished
				return res.status(420)
			}
			userObject.levels[req.body.id].mcQuestions.failed = req.body.attemptNumber;
		} else if (req.body.mode == "open") {
			if (userObject.levels[req.body.id].openQuestions.finished) {
				//Dont let user fail a section they already finished
				return res.status(420)
			}
			userObject.levels[req.body.id].openQuestions.failed = req.body.attemptNumber;
		}

		//Update user object
		await collection.updateOne({ username: req.session.user.username }, { $set: { levels: userObject.levels } });
		return res.status(200);
	});

	app.post("/api/levelData", requireAuth, async (req, res) => {
		let userObject = await collection.findOne({ username: req.session.user.username });
		//Return level data
		res.json(userObject.levels)
	});


	app.get("/api/userData", requireAuth, async (req, res) => {
		let { data } = await collection.findOne({ username: req.session.user.username });
		//Return user data
		return res.status(200).json(data);
	});

	// Handles any requests that don't match the ones above
	app.get('*', (req, res) => {
		if (req.url == "/") {
			console.log('home')
		} else {
			console.log(req.url);
		}
		res.sendFile(path.join(__dirname + '/client/build/index.html'));
	});

	const port = process.env.PORT || 5000;
	app.listen(port);

	console.log('App is listening on port ' + port);
});


const requireAuth = (req, res, next) => {
	const { user } = req.session;
	if (!user) {
		return res.status(401).json({ message: "Unauthorized" });
	}
	next();
}
