const express = require('express');
const path = require('path');
const session = require('express-session');
const encryptString = require('./helpers/encryptString.js').encryptString;
const getLevelData = require('./client/src/levels/index.js').getLevelData;

const app = express();
const { MongoClient } = require('mongodb');


var dbClient = new MongoClient(
	`mongodb+srv://Admin:GFZ4pTNUbF6g3Ut1@cluster0.cf0lh.mongodb.net/cluster0?retryWrites=true&w=majority`
	, { useNewUrlParser: true, useUnifiedTopology: true });

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.json());
app.use(session({
	secret: 'secretlol'
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

		const user = await collection.findOne({
			username: username
		})
		if (!user) {
			return res.status(403).json({
				message: 'Wrong email or password.'
			}
			)
		}

		if (encryptString(password) != user.password) {
			return res.status(403).json({ message: "Incorrect password" });
		}

		let userInfo = Object.assign({}, { ...user });
		userInfo.password = undefined;

		req.session.user = userInfo;
		res.status(200).json({ message: "Signin successful" })
	});
	app.get("/api/authed", requireAuth, () => { res.status(200); });


	app.post("/api/createUser", async (req, res) => {
		const { username, password } = req.body;
		const user = await collection.findOne({
			username: username
		});

		if (!user) {
			//Create an insert a new user into the database
			await collection.insertOne({
				username: username,
				password: encryptString(password),
				levels: {

				},
				stars: 0
			});
			res.status(200).json({
				message: "Account created"
			})
		} else {
			return res.status(409).json({
				message: 'Account with that email already exists'
			}
			)
		}
	});
	app.post("/api/unlockLevel", requireAuth, async (req, res) => {
		let userObject = await collection.findOne({ username: req.session.user.username });
		let level = getLevelData(req.body.id);

		let newLevelValue = {
			name: level.title,
			stars: 0,
			infoRead: 0,
			mcQuestions: { started: false, finished: false },
			openQuestions: { started: false, finished: false }
		}
		userObject.levels[req.body.id] = newLevelValue;

		await collection.updateOne({ username: req.session.user.username }, { $set: { levels: userObject } });
		return res.status(200);
	})

	app.post("/api/levelData", requireAuth, async (req, res) => {
		let userObject = await collection.findOne({ username: req.session.user.username });
		res.json(userObject.levels)
	});


	app.get("/api/userData", requireAuth, async (req, res) => {
		let { data } = await collection.findOne({ username: req.session.user.username });
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
