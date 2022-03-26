import express from "express"
import path from "path"
import session from express-session");
import encryptString from "./helpers/encryptString.js"
import getLevelData from "./client/src/levels/index.js"
import firstLevelName from "./client/src/levels/index.js"
import firstLevelId from "./client/src/levels/index.js"

Create server user express
Initialize mongodb connection
Initialize sessions 

Serve static files from build folder

Connect to database
  Set collection to database collection

  On request to "/api/auth"
    Store username and password from body

    Find user from database

    Confirm passwords match
      Send error if no match
    
    Create session to keep user logged in

    Return 200

  On request to "/api/logout"
    Destory user session

  On request to "/api/createUser"
    Store username and password from body

    Find user from database

    If no user
      Create new user

      Insert user into database

      Return 200
    } else {
      //Account already exists
      return res.status(409).json({
        message: 'Account with that email already exists'
      }
      )
    }
  });
  On request to "/api/setProfile", requireAuth
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

  On request to "/api/getProfile", requireAuth
    let userObject = await collection.findOne({
      username: req.session.user.username,
    });
    //Return level data
    res.json(userObject.profilePic);
  });

  On request to "/api/buyItem", requireAuth
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



  On request to "/api/unlockLevel", requireAuth

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

  On request to "/api/finishSection", requireAuth
    let userObject = await collection.findOne({ username: req.session.user.username });

    //Check that user hasnt failed section
    if (req.body.mode == "info") {
      userObject.levels[req.body.id].infoRead = true;
      userObject.levels[req.body.id].mcQuestions.unlocked = true;
      userObject.stars++;
    } else if (req.body.mode == "multi") {
      let failedMulti = userObject.levels[req.body.id].mcQuestions.failed;
      if (failedMulti && failedMulti == req.body.attemptNumber) {
        return res.send("failed");
      };
      userObject.levels[req.body.id].mcQuestions.finished = true;
      userObject.levels[req.body.id].mcQuestions.failed = false;
      userObject.levels[req.body.id].openQuestions.unlocked = true;
      userObject.stars += 2;
    } else if (req.body.mode == "open") {
      let failedOpen = userObject.levels[req.body.id].openQuestions.failed;
      if (failedOpen && failedOpen == req.body.attemptNumber) {
        return res.send("failed");
      };
      userObject.levels[req.body.id].openQuestions.finished = true;
      userObject.levels[req.body.id].openQuestions.failed = false;
      userObject.levels[req.body.id].challenge.unlocked = true;
      userObject.stars += 2;
    } else if (req.body.mode == "challenge") {
      userObject.levels[req.body.id].challenge.finished = true;
      userObject.stars += 3;
    }
    //Update user object
    await collection.updateOne({ username: req.session.user.username }, { $set: { levels: userObject.levels, stars: userObject.stars } });
    return res.send("ok");
  });

  On request to "/api/failSection", requireAuth

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

  On request to "/api/levelData", requireAuth
    let userObject = await collection.findOne({ username: req.session.user.username });
    //Return level data
    res.json(userObject.levels)
  });


  app.get("/api/userData", requireAuth
    let { data } = await collection.findOne({ username: req.session.user.username });
    //Return user data
    return res.status(200).json(data);
  });

  On request to "/api/addStars", requireAuth
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

  On request to "/api/getStars", requireAuth
    let userObject = await collection.findOne({
      username: req.session.user.username,
    });
    //Return level data
    res.send(`${userObject.stars}`);
  });

  On request to "/api/addUnlock", requireAuth
    console.log(1);
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

  On request to "/api/unlockData", requireAuth
    let userObject = await collection.findOne({
      username: req.session.user.username,
    });
    console.log(userObject.unlockedItems);
    //Return level data
    res.json(userObject.unlockedItems);
  });

  On request to "/api/unlockLevel", requireAuth
    //Get user from db
    let userObject = await collection.findOne({
      username: req.session.user.username,
    });
    let level = getLevelData(req.body.id);

    let newLevelValue = {
      name: level.title,
      stars: 0,
      infoRead: 0,
      mcQuestions: { failed: false, finished: false },
      openQuestions: { failed: false, finished: false },
    };
    userObject.levels[req.body.id] = newLevelValue;
    //Unlock level for user
    await collection.updateOne(
      { username: req.session.user.username },
      { $set: { levels: userObject.levels } }
    );
    return res.status(200);
  });

  On request to "/api/finishSection", requireAuth
    let userObject = await collection.findOne({
      username: req.session.user.username,
    });

    //Check that user hasnt failed section
    if (req.body.mode == "info") {
      userObject.levels[req.body.id].infoRead = true;
    } else if (req.body.mode == "multi") {
      let failedMulti = userObject.levels[req.body.id].mcQuestions.failed;
      console.log(
        failedMulti,
        req.body.attemptNumber,
        req.body.id,
        req.body.mode
      );
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

  On request to "/api/failSection", requireAuth
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

  On request to "/api/levelData", requireAuth
    let userObject = await collection.findOne({
      username: req.session.user.username,
    });
    //Return level data
    res.json(userObject.levels);
  });

  app.get("/api/userData", requireAuth
    let { data } = await collection.findOne({
      username: req.session.user.username,
    });
    //Return user data
    return res.status(200).json(data);
  });

  // Handles any requests that don't match the ones above
  app.get("*", (req, res) => {
    if (req.url == "/") {
      console.log("home");
    } else {
      console.log(req.url);
    }
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
