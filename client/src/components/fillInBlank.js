import React useState, useRef, useEffect from "react"
import Button from "./button.js"
import SyntaxHighlighter from "react-syntax-highlighter"
import vs2015 from "react-syntax-highlighter/dist/esm/styles/hljs"

Define theme to vs2015;
function FillInBlank(props) {
  // Store user typed text
  Define typedText to ""
  Define setText(Parameter x) to set typedText to x
  Define questionCodeText to codeText from props

  Display directions text at top of screen
  Display text editor on left side of screen:
    Set text in text editor to question text first half + typedText + question text second half
  Display question text on right side of screen
  Display input field on right side of screen;
    On value changed, set typedText to input field value
  Display button with text "submit" on right side of screen:
    When "submit" is clicked:
      Submit typedText as answer
}

export FillInBlank;
