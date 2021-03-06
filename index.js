const express = require("express");
const path = require("path");
require("dotenv").config();
const session = require("express-session");
var MongoDBStore = require('connect-mongodb-session')(session);
const encryptString = require("./helpers/encryptString.js").encryptString;
const getLevelData = require("./client/src/levels/index.js").getLevelData;
const firstLevelName = require("./client/src/levels/index.js").firstLevelName;
const firstLevelId = require("./client/src/levels/index.js").firstLevelId;

const app = express();
const { MongoClient } = require("mongodb");

var store = new MongoDBStore({
  uri: 'mongodb+srv://Admin:GFZ4pTNUbF6g3Ut1@cluster0.cf0lh.mongodb.net/cluster0?retryWrites=true&w=majority',
  collection: 'mySessions'
});

//Connect to database
var dbClient = new MongoClient(
  `mongodb+srv://Admin:GFZ4pTNUbF6g3Ut1@cluster0.cf0lh.mongodb.net/cluster0?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true, minPoolSize: 20 }
);

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));
app.use(express.json());
app.use(
  session({
    secret: "mUCHDFMShcuoifmhcsdpmcMDPismpicds",
    saveUninitialized: true,
    resave: false,
    store: store,
    cookie: {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    },
  })
);
app.use((req, res, next) => {
  console.log(req.session);
  next();
});

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
    req.session.destroy();
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
        openQuestions: { failed: false, finished: false },
        challenge: { finished: false },
      }

      let picData = {
        bottom: 0,
        mid: 0,
        top: 0,
        face: 0
      };

      await collection.insertOne({
        username: username,
        password: encryptString(password),
        levels: levelData,
        stars: 0,
        profilePic: picData,
        unlockedItems: { bottom: [0], mid: [0], top: [0], face: [0] }
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
  app.post("/api/setProfile", requireAuth, async (req, res) => {
    let userObject = await collection.findOne({
      username: req.session.user.username,
    });
    let picture = {
      bottom: req.body.bottom || userObject.profilePic.bottom,
      mid: req.body.mid || userObject.profilePic.mid,
      top: req.body.top || userObject.profilePic.top,
      face: req.body.face || userObject.profilePic.face
    };
    await collection.updateOne(
      { username: req.session.user.username },
      { $set: { profilePic: picture } }
    );
    return res.status(200);
  });

  app.post("/api/getProfile", requireAuth, async (req, res) => {
    let userObject = await collection.findOne({
      username: req.session.user.username,
    });
    //Return level data
    res.json(userObject.profilePic);
  });

  app.post("/api/buyItem", requireAuth, async (req, res) => {
    let userObject = await collection.findOne({
      username: req.session.user.username,
    });

    let currentUnlocked = userObject.unlockedItems;
    if (!currentUnlocked[req.body.type].includes(req.body.id)) {
      //Check incase user clicked to buy an item before the shop fully loaded

      userObject.stars -= req.body.req;
      currentUnlocked[req.body.type].push(req.body.id);
    }

    await collection.updateOne(
      { username: req.session.user.username },
      { $set: { unlockedItems: currentUnlocked } }
    );
    await collection.updateOne(
      { username: req.session.user.username },
      { $set: { stars: userObject.stars } }
    );
    res.send(200);
  });



  app.post("/api/unlockLevel", requireAuth, async (req, res) => {

    //Get user from db
    let userObject = await collection.findOne({ username: req.session.user.username });
    let level = getLevelData(req.body.id);

    let newLevelValue = {
      name: level.title,
      stars: 0,
      infoRead: 0,
      mcQuestions: { failed: false, finished: false, unlocked: false },
      openQuestions: { failed: false, finished: false, unlocked: false },
      challenge: { finished: false, unlocked: false }
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
      if (!userObject.levels[req.body.id].infoRead) {
        userObject.stars++;
      }

      userObject.levels[req.body.id].infoRead = true;
      userObject.levels[req.body.id].mcQuestions.unlocked = true;
    } else if (req.body.mode == "multi") {
      let failedMulti = userObject.levels[req.body.id].mcQuestions.failed;
      if (failedMulti && failedMulti == req.body.attemptNumber) {
        return res.send("failed");
      };
      if (!userObject.levels[req.body.id].mcQuestions.finished) {
        userObject.stars += 2;
      }

      userObject.levels[req.body.id].mcQuestions.finished = true;
      userObject.levels[req.body.id].mcQuestions.failed = false;
      userObject.levels[req.body.id].openQuestions.unlocked = true;
    } else if (req.body.mode == "open") {
      let failedOpen = userObject.levels[req.body.id].openQuestions.failed;
      if (failedOpen && failedOpen == req.body.attemptNumber) {
        return res.send("failed");
      };
      if (!userObject.levels[req.body.id].openQuestions.finished) {
        userObject.stars += 2;
      }
      userObject.levels[req.body.id].openQuestions.finished = true;
      userObject.levels[req.body.id].openQuestions.failed = false;
      userObject.levels[req.body.id].challenge.unlocked = true;
    } else if (req.body.mode == "challenge") {
      if (!userObject.levels[req.body.id].challenge.finished) {
        userObject.stars += 3;
      }
      userObject.levels[req.body.id].challenge.finished = true;
    }
    //Update user object
    await collection.updateOne({ username: req.session.user.username }, { $set: { levels: userObject.levels, stars: userObject.stars } });
    return res.send("ok");
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

  app.post("/api/addStars", requireAuth, async (req, res) => {
    let userObject = await collection.findOne({
      username: req.session.user.username,
    });

    userObject.stars += req.body.stars;

    await collection.updateOne(
      { username: req.session.user.username },
      { $set: { stars: userObject.stars } }
    );
    return res.status(200);
  });

  app.post("/api/getStars", requireAuth, async (req, res) => {
    let userObject = await collection.findOne({
      username: req.session.user.username,
    });
    //Return level data
    res.send(`${userObject.stars}`);
  });

  app.post("/api/addUnlock", requireAuth, async (req, res) => {
    let userObject = await collection.findOne({
      username: req.session.user.username,
    });

    userObject.unlockData += "-" + req.body.unlockData;

    await collection.updateOne(
      { username: req.session.user.username },
      { $set: { unlockData: userObject.unlockData } }
    );
    return res.status(200);
  });

  app.post("/api/unlockData", requireAuth, async (req, res) => {
    let userObject = await collection.findOne({
      username: req.session.user.username,
    });
    //Return level data
    res.json(userObject.unlockedItems);
  });

  app.post("/api/finishSection", requireAuth, async (req, res) => {
    let userObject = await collection.findOne({
      username: req.session.user.username,
    });

    //Check that user hasnt failed section
    if (req.body.mode == "info") {
      userObject.levels[req.body.id].infoRead = true;
    } else if (req.body.mode == "multi") {
      let failedMulti = userObject.levels[req.body.id].mcQuestions.failed;
      if (failedMulti && failedMulti == req.body.attemptNumber) {
        return res.send("failed");
      }
      userObject.levels[req.body.id].mcQuestions.finished = true;
      userObject.levels[req.body.id].mcQuestions.failed = false;
    } else if (req.body.mode == "open") {
      let failedOpen = userObject.levels[req.body.id].openQuestions.failed;
      if (failedOpen && failedOpen == req.body.attemptNumber) {
        return res.send("failed");
      }
      userObject.levels[req.body.id].openQuestions.finished = true;
      userObject.levels[req.body.id].openQuestions.failed = false;
    }
    //Update user object
    await collection.updateOne(
      { username: req.session.user.username },
      { $set: { levels: userObject.levels } }
    );
    return res.status(200);
  });

  app.post("/api/failSection", requireAuth, async (req, res) => {
    //Fail user section
    let userObject = await collection.findOne({
      username: req.session.user.username,
    });
    if (req.body.mode == "multi") {
      if (userObject.levels[req.body.id].mcQuestions.finished) {
        //Dont let user fail a section they already finished
        return res.status(420);
      }
      userObject.levels[req.body.id].mcQuestions.failed =
        req.body.attemptNumber;
    } else if (req.body.mode == "open") {
      if (userObject.levels[req.body.id].openQuestions.finished) {
        //Dont let user fail a section they already finished
        return res.status(420);
      }
      userObject.levels[req.body.id].openQuestions.failed =
        req.body.attemptNumber;
    }

    //Update user object
    await collection.updateOne(
      { username: req.session.user.username },
      { $set: { levels: userObject.levels } }
    );
    return res.status(200);
  });

  app.post("/api/levelData", requireAuth, async (req, res) => {
    let userObject = await collection.findOne({
      username: req.session.user.username,
    });
    //Return level data
    res.json(userObject.levels);
  });

  app.get("/api/userData", requireAuth, async (req, res) => {
    let { data } = await collection.findOne({
      username: req.session.user.username,
    });
    //Return user data
    return res.status(200).json(data);
  });

  // Handles any requests that don't match the ones above
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });

  const port = process.env.PORT || 5000;
  app.listen(port);

  console.log("App is listening on port " + port);
});

const requireAuth = (req, res, next) => {
  const { user } = req.session;
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};
