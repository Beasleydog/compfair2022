import React, useState, useRef, useEffect from "react";
import useParams from "react-router-dom";
import MouseBlurEffect from "../components/mouseBlurEffect.js"
import MultipleChoiceQuestion from "../components/multipleChoiceQuestion.js";
import fillInBlank from "../components/fillInBlank";
import BlurBackground from "../components/blurBackground.js";
import getLevelData from "../levels/index.js";
import Button from "../components/button.js";
import FillInBlank from "../components/fillInBlank";
import ChallengeQuestion from "../components/challengeQuestion.js";
function Play() {
    Define attemptNumber, id, mode, number from URL
    Define popupOpen
    Define setPopup to set popupOpen
    Define correct
    Define setCorrect to set correct
    Define popupText
    Define setText to set popupText

    Define levelData as AllLevels;

    Run once:
    if mode is "info"
        Set text to LevelInfo;
        Show popup
    if mode is "multi"
        Set text to current question explanation
    if mode is "open"
    Set text to current question explanation
    if mode is "challenge"
        Set text to current question explanation
    }
    [Main Content]:
        if mode is "multi"
            Display multiple choice question
            Set question to current multiple choice question question
            Set answer to current multiple choice question answers
            On answer click
                Check answer accuracy
                Open popup
                If failed question  
                    Fail level
        if mode is "open"
            Display fill in the blank question
            Set question to current fill in the blank question
            Set answer to current fill in the blank answer
            On answer click
                Check answer accuracy
                Open popup
                If failed question  
                    Fail level
         if mode is "challenge"
            Display challenge question
            Set correctCode to current challenge question correct code
            Set defaultBackground to current challenge question default background
            On 100% accuracy
                Open popup
        [Close button]:
            Display X
            On click redirect to /levels
        [Popup]:
            If answer correct
                Display checkmark
            If answer incorrect
                Display X
            Display popup text in center
            Display OK button
                On click
                    if mode is info
                        Finish info section
                    if mode is multi
                        if on final question
                            Finish multiple choice section
                        Otherwise
                            Advance to next question
                    if mode is open
                        if on fill in the blank question
                            Finish fill in the blank section
                        Otherwise
                            Advance to next question
                    if mode is challenge
                        Finish challenge section
        [Blur background]:
            Display blurs
}
export default Play;
