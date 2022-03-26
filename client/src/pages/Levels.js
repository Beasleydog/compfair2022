import React,  useState, useRef, useEffect  from "react";
import  Link  from "react-router-dom";
import BlurBackground from "../components/blurBackground.js";
import  getAllLevels  from "../levels/index.js";
import  useParams  from "react-router-dom";
import DisplayProfilePic from "../components/profilePicture.js";
import Button from "../components/button.js";
function Levels() {
  Define levelInfo to []
  Define setLevelInfo(Parameter x) to set levelInfo to x
  Define allLevels to getAllLevels();

  Define profilePicture to { top: 0, mid: 0, bottom: 0, face: 0 }
  Define setProfilePicture(Parameter x) to set profilePicture to x

  Run Once Ever:
    Fetch profile picture from server as json
    setProfilePicture(json from server)

  Run Once Ever:
    async function fetchData() {
      Fetch level data from server as json
      setLevelInfo(Fetched level data)
    fetchData()

  If user is not logged in, redirect to login page

  [Main Content]
      Display profilePicture on left side of screen
      Display username below profilePicture
      Display star count below username
      Display button below star count with text "shop":
        When clicked:
          Redirect user to shop page

      For each level in level data:
        Display level box with level title
        Display star count indicating number of stars unlocked form level
        if level is locked:
          Set as unclickable
      
      Display text "Logout" in bottom right screen
      When "Logout" is clicked:
        Set logged in to none
        Redirect user to home page


      BlurBackground();
        Display glow at x and y
}


function UserDisplay(Parameter name, Parameter stars, Parameter profilePicture }) {
  Display profilePicture
  Display name below profilePicture
  Display stars below name
  Display button with text "shop" under stars
  When "shop" is clicked:
    Redirect user to shop page
}


function LevelDisplay(Parameter name, Parameter stars, Parameter locked, Parameter finished, Parameter failed, Parameter unlocked, Parameter id }) {
  Define failedClass to "shadow-[0px_0px_7px_6px_#c21616] rounded-[50%]";
  Define finishClass to "shadow-[0px_0px_3px_4px_#169016] rounded-[50%]";

  if (failed is false) Define failed to {};
  if (finished is false) Define finished to {};
  if (unlocked is false) Define unlocked to {};

  function playMode(Parameter number, Parameter id, Parameter mode) {
    if (locked is true) return;
    if (mode equals "info" && !unlocked.info) return
    if (mode equals "multi" && !unlocked.mcQuestions) return
    if (mode equals "open" && !unlocked.openQuestions) return
    if (mode equals "challenge" && !unlocked.challenge) return
    window.location.replace(`/play/${number}/${id}/${mode}/0`);
  }
  Display level title
  Repeat 4 times:
    Display icon
    if icon is locked:
      Make icon unclickable
    if icon is clicked and is clickable:
      redirect to var page
      if icon is 1:
        var is info
      if icon is 2:
        var is multiple choice
      if icon is 3:
        var is open ended
      if icon is 4:
        var is challenge
  Display stars unlocked from level
}

function randomNumber() {
  return random number;
}

export Levels;
