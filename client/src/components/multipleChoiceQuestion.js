import React, useState, useRef, useEffect from "react"
import Button from "../components/button.js"
import SyntaxHighlighter from "react-syntax-highlighter"
import vs2015 from "react-syntax-highlighter/dist/esm/styles/hljs"

Define theme to vs2015;
function MultipleChoiceQuestion(props) {
  Define selected to undefined
  Define setSelected(Parameter x) to set selected to x

  Display question text on top of screen
  Repeat 3 times:
    MultipleChoiceOption():
      Answers set to answers from props
  Display button with text "Ok" on bottom of screen
  If "Ok" is clicked:
    Submit selected answer as answer
}

function MultipleChoiceOption(props) {
  Display option from props
  If clicked:
    Set selected answer as option
}

export MultipleChoiceQuestion;
