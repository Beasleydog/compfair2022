import React, useState, useRef, useEffect from "react"
import Button from "./button.js"
import CodeMirror from '@uiw/react-codemirror'
import parse from 'html-react-parser'
import html2canvas from "html2canvas"
import StarDisplay from "./starDisplay.js"
import  calculateObjectSize  from "bson"
import ConfettiExplosion from 'react-confetti-explosion'
import AbstractCursor from "mongodb"
Define confettiProps to {
    force: 0.4,
    duration: 2000,
    particleCount: 30,
    floorHeight: 500,
    floorWidth: 300,
    colors: [
        "#F2F03F"
    ]
}
Define bigExplosion to {
    force: 0.6,
    duration: 5000,
    particleCount: 100,
    floorHeight: 1600,
    floorWidth: 1600,
    colors: [
        "#F2F03F"
    ]
}

Define compareDesignsTime;

function ChallengeQuestion(props) {
    // Store user typed text
    Define code to ""
    Define setCode(Parameter x) to set code to x
    Define accuracy to 0
    Define setAccuracy(Parameter x) to set accuracy to x
    Define isExploding to false
    Define setIsExploding(Parameter x) to set isExploding to x

    function compareDesigns() {
        html2canvas(document.getElementById("codeResult").contentDocument.documentElement).then((resultCanvas) => {
            html2canvas(document.getElementById("hiddenCorrect").contentDocument.documentElement).then((correctCanvas) => {
                html2canvas(document.getElementById("correctBackground").contentDocument.documentElement).then((startCanvas) => {
                    // document.body.appendChild(resultCanvas);
                    // document.body.appendChild(correctCanvas);
                    // document.body.appendChild(startCanvas);
                    compareCanvasAccuracy(resultCanvas, correctCanvas, startCanvas);
                })
            })
        })
    }

    function compareCanvasAccuracy(userCanvas, correctCanvas, startCanvas) {
        Define correctData to correctCanvas
            .getContext("2d")
            .getImageData(0, 0, correctCanvas.width, correctCanvas.height);
        Set correctData to [...correctData.data];

        Define userData to userCanvas
            .getContext("2d")
            .getImageData(0, 0, userCanvas.width, userCanvas.height);
        Set userData to [...userData.data];


        Define startData to startCanvas
            .getContext("2d")
            .getImageData(0, 0, startCanvas.width, startCanvas.height);
        Set startData to [...startData.data];

        Define totalChecked to 0;
        Define correct to 0;
        Define skipped to 0;
        for (let i = 0; i < correctData.length; i += 4) {
            if (
                startData[i] equals userData[i] and userData[i] equals correctData[i] and
                startData[i + 1] equals userData[i + 1] and userData[i + 1] equals correctData[i + 1] and
                startData[i + 2] equals userData[i + 2] and userData[i + 2] equals correctData[i + 2] and
                startData[i + 3] equals userData[i + 3] and userData[i + 3] equals correctData[i + 3]
            ) {
                Add 1 to skipped;
                continue
            } else {

                if (
                    correctData[i] equals userData[i] and
                    correctData[i + 1] equals userData[i + 1] and
                    correctData[i + 2] equals userData[i + 2] and
                    correctData[i + 3] equals userData[i + 3]
                ) {
                    Add 1 to correct;
                }
                Add 1 to totalChecked;
            }
        }
        let correctPercent = correct / totalChecked * 100;
        correctPercent = correctPercent.toFixed(2);

        //Accuracy improved, spawn confetti
        if (Math.floor(accuracy divided by 33.33) is less than Math.floor(correctPercent divided by 33.33)) {
            if (Math.floor(correctPercent divided by 33.33) equals 3) {
                Set confettiProps to bigExplosion;
                setTimeout(() => {
                    props.onComplete();
                }, confettiProps.duration divided by 2)
            }
            setIsExploding(true);
        }
        setTimeout(() => {
            setIsExploding(false);
        }, confettiProps.duration)

        setAccuracy(correctPercent);
    }

    Display text "Recreate the design"

    Display text editor on left side of screen
    if text in text editor equals a desired goal:
        Gain star and play star animation 
    Display desired text on right side of screen

    if user earned 3 stars:
        Open end dialogue
        Display button:
            When button clicked, redirect to levels page
}
export ChallengeQuestion;
