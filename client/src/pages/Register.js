import React, useState, useRef, useEffect from "react"
import  Link  from "react-router-dom"
import MouseBlurEffect from "../components/mouseBlurEffect.js"
import Button from "../components/button.js"
async function login() {
  //login user
  Send username and password from input fields to server
  If server can't find username or username has incorrect password:
    Alert user of error
  Else:
    Set username as the user
    Redirect user to levels page
}
async function signup() {
  //signup user
  Send username and password from input fields to server
  If username already stored in server:
    Alert user of error
  Else:
    login()
}
function Register() {
    [Header]
    Display site title ("DevBytes") top left of screen
    When title is clicked, redirect user to the home page
    [Header End]

    [Main Content]
    Section():
      Display glow at x and y
      Display "Get Started!" center screen
      Display "Username" below "Welcome Back"
      Display input field below "Username"
      Display "Password" below "Username" input field
      Display input field below "Password"
      Display "Register" below "Password" input field
      When "Register" is clicked:
        signup()
    MouseBlurEffect()
    [Main Content End]
}
function Section(props) {
  Display glows of props
  Display content of props
}

export default Register;
