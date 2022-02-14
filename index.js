const express = require('express');
const path = require('path');
const session = require('express-session');
const encryptString = require('./helpers/encryptString.js').encryptString;


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

	// An api endpoint that returns a short list of items
	app.get('/api/getList', (req, res) => {
		var list = ["item1", "item2", "item3"];
		res.json(list);
		console.log('Sent list of items');
	});

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
	app.post("/api/createUser", async (req, res) => {
		const { username, password } = req.body;
		const user = await collection.findOne({
			username: username
		});
		console.log(user);
		if (!user) {
			await collection.insertOne({
				username: username,
				password: encryptString(password),
				data: ""
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
	})
	app.post("/api/updateData", requireAuth, async (req, res) => {
		await collection.updateOne({ username: req.session.user.username }, { $set: { data: req.body.data } });
		return res.status(200);
	});
	app.get("/api/userData", requireAuth, async (req, res) => {
		let { data } = await collection.findOne({ username: req.session.user.username });
		return res.status(200).json(data);
	});
	// Handles any requests that don't match the ones above
	app.get('*', (req, res) => {
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
