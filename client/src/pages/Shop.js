import React useState, useReducer, useEffect from "react"
import BlurBackground from "../components/blurBackground.js"
import getAllBottomPic, getAllMidPic, getAllTopPic from "../profilePictureData/index.js"
import DisplayProfilePic from "../components/profilePicture.js"

function Shop() {
  Define allBottomPic to getAllBottomPic();
  Define allMidPic to getAllMidPic();
  Define allTopPic to getAllTopPic();

  Define forceUpdate() to rerender element

  If user is not logged in, redirect to login page

  //Just start off with default character
  Define profilePicture to {top: 0, mid: 0, bottom: 0, face: 0}
  Define setProfilePicture(Parameter x) to set profilePicture to x

  Run Once Ever:
    Fetch profile picture data from server as json
    setProfilePicture():
      Set profilePicture to retrieved profile picture data from server

  Define stars to 0;
  Define setStars(Parameter x) as set stars to x;
  //Default to nothing unlocked
  Define unlockData to {top: [], mid: [], bottom: [], face: []}
  Define setUnlockData(Parameter x) as set unlockData to x;

  //Get user stars and unlocked items, do it in two functions so requests can be made at same time
  Run Once Ever:
    Fetch stars from server as text
    setStars():
      Set stars to retrieved stars from server as int

  async function updateUnlockData() {
    Fetch unlockData from server as json
    setUnlockData():
      Set unlockData to retrieved unlockData from server
  }
  Run Once Ever:
    updateUnlockData()

  async function setProfilePart(Parameter type, Parameter id) {
    setProfilePicture():
      Set profilePicture type to id
      Set Profile Picture in server to profilePicture 
    forceUpdate();
  }

  function PicPart(Parameter id, Parameter src, Parameter req, Parameter text, Parameter type ) {
    Display Image:
      Image = src
      if Image is clicked:
        if unlockData contains id in type:
          setProfilePart():
            a
        if stars is greater than or equal to req:
          setUnlockData():
            Add id to unlockData
          buyItem(type, id, req)
          setProfilePart(type, id)
        if stars are less than req and unlockData does not contain id in type:
          Make unclickable
    Display req below image
    if unlockData contains id in type:
      Replace req with "✔"
  }

  async function buyItem(Parameter type, Parameter id, Parameter req) {
    setStars():
      Set stars to stars - req
    Add shop item id to server unlock data
    Subtract req from server stars
    updateUnlockData();
  }

    [Header]
      Display "X" on top left of screen:
        When "X" is clicked, redirect user to the levels page
    [Header End]

    [Main Content]
      DisplayProfilePic():
        Display profilePicture as Image on left of screen:
          Image = top of profilePicture + mid of profilePicture + bottom of profilePicture
      Display user star count below profile Picture

      ShopSection():
        Display "Feet" on right of screen
        for each item in allBottomPic:
          PicPart():  
            Display item below "Feet"
            if item req is less than stars, make unclickable
            if item is clicked and isn't unclickable:
              if item req is greater than stars, unlock item and adjust user star count

      ShopSection():
        Display "Bodies" on right of screen
        for each item in allMidPic:
          PicPart():  
            Display item below "Bodies"
            if item req is less than stars, make unclickable
            if item is clicked and isn't unclickable:
              if item req is greater than stars, unlock item and adjust user star count

      ShopSection():
        Display "Hats" on right of screen
        for each item in allTopPic:
          PicPart():  
            Display item below "Hats"
            if item req is less than stars, make unclickable
            if item is clicked and isn't unclickable:
              if item req is greater than stars, unlock item and adjust user star count
      
      BlurBackground():
        Display glow at x and y
    [Main Content End]
}

function ShopSection(Parameter contents, Parameter title) {
  Display title
  Display contents below title
}

export default Shop;
