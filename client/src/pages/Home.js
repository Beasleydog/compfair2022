import React, useState, useRef, useEffect from "react"
import Link from "react-router-dom"
import MouseBlurEffect from "../components/mouseBlurEffect.js"

function Home() {
  [Header]:
    Display site title top left of screen
    Display "Sign In" and "About" on top right of screen:
      When "Sign In" is clicked, redirect user to the login page
  [Header End]

  [Main Content]:
    Display "The Free, Fun, And Effective Way To Learn Web Design" center screen
    Display GetStarted() center screen:
      When GetStarted() is clicked, redirect user to the register page

     Section():
      Display glow at x and y
      Display "Learn" and "Learn simple HTML and CSS concepts."
      Display Image:
        Image = Learning Image Example

     Section():
      Display glow at x and y
      Display "Review" and "Review concepts with multiple choice and open ended questions."
      Display Image:
        Image = Reviewing Image Example
    
    Section():
      Display glow at x and y
      Display "Apply" and "Complete design challenges to check for understanding"
      Display Image:
        Image = Application Image Example

    Section():
      Display glow at x and y
      Display "Earn" and "Earn Stars and unlock cosmetics"
      Display Image:
        Image = Shop Image Example       
  [Main Content End]
  
  MouseBlurEffect()

}

function Section(Parameter glows, Parameter content){
  Place space the height of the user's screen
  Display content
  Display glows

}

function GetStartedButton(){
  Display button with text "Get Started":
    Link button to url "/register"
}
          

export Home
