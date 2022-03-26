import React, useState, useRef, useEffect from "react"
import  Link, { useLinkClickHandler }  from "react-router-dom"
import MouseBlurEffect from "../components/mouseBlurEffect.js"
import Button from "../components/button.js"
import  ServerApiVersion  from "mongodb"
function Login() {
  if user is logged in:
    Redirect to url "/levels"
    
    [Header]
    Display site title ("DevBytes") top left of screen
    When title is clicked, redirect user to the home page
    [Header End]

    [Main Content]
    Section():
      Display glow at x and y
      Display "Welcome Back" center screen
      Display "Username" below "Welcome Back"
      Display input field below "Username"
      Display "Password" below "Username" input field
      Display input field below "Password"
      Display "Log In" below "Password" input field
      When "Log In" is clicked:
        login()
    MouseBlurEffect()
    [Main Content End]
}
async function login() {
  //Login user
  Send username and password from input fields to server
  If server can't find username or username has incorrect password:
    Alert user of error
  Else:
    Set username as the user
    Redirect user to levels page
}

function Section(props) {
  Display glows of props
  Display content of props
}

function GetStartedButton(props) {
  Display button with text "Login"
}

export Login
