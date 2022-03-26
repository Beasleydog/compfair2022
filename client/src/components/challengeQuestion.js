import React, { useState, useRef, useEffect } from "react";
import Button from "./button.js";
import CodeMirror from '@uiw/react-codemirror';
import parse from 'html-react-parser'
import html2canvas from "html2canvas";
import StarDisplay from "./starDisplay.js"
import { calculateObjectSize } from "bson";
import ConfettiExplosion from 'react-confetti-explosion';
let confettiProps = {
    force: 0.4,
    duration: 2000,
    particleCount: 30,
    floorHeight: 500,
    floorWidth: 300,
    colors: [
        "#F2F03F"
    ]
};
let bigExplosion = {
    force: 0.6,
    duration: 5000,
    particleCount: 100,
    floorHeight: 1600,
    floorWidth: 1600,
    colors: [
        "#F2F03F"
    ]
}

let compareDesignsTime;

function ChallengeQuestion(props) {
    // Store user typed text
    const [code, setCode] = useState("");
    const [accuracy, setAccuracy] = useState(0);
    const [isExploding, setIsExploding] = React.useState(false);

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
        let correctData = correctCanvas
            .getContext("2d")
            .getImageData(0, 0, correctCanvas.width, correctCanvas.height);
        correctData = [...correctData.data];

        let userData = userCanvas
            .getContext("2d")
            .getImageData(0, 0, userCanvas.width, userCanvas.height);
        userData = [...userData.data];


        let startData = startCanvas
            .getContext("2d")
            .getImageData(0, 0, startCanvas.width, startCanvas.height);
        startData = [...startData.data];

        console.log(startData, userData, correctData)
        let totalChecked = 0;
        let correct = 0;
        let skipped = 0;
        for (let i = 0; i < correctData.length; i += 4) {
            if (
                startData[i] == userData[i] && userData[i] == correctData[i] &&
                startData[i + 1] == userData[i + 1] && userData[i + 1] == correctData[i + 1] &&
                startData[i + 2] == userData[i + 2] && userData[i + 2] == correctData[i + 2] &&
                startData[i + 3] == userData[i + 3] && userData[i + 3] == correctData[i + 3]
            ) {
                skipped++;
                continue
            } else {

                if (
                    correctData[i] == userData[i] &&
                    correctData[i + 1] == userData[i + 1] &&
                    correctData[i + 2] == userData[i + 2] &&
                    correctData[i + 3] == userData[i + 3]
                ) {
                    correct++;
                }
                totalChecked++;
            }
        }
        let correctPercent = correct / totalChecked * 100;
        correctPercent = correctPercent.toFixed(2);
        console.log(correct, totalChecked, correctPercent)
        //Accuracy improved, spawn confetti
        if (Math.floor(accuracy / 33.33) < Math.floor(correctPercent / 33.33)) {
            if (Math.floor(correctPercent / 33.33) == 3) {
                confettiProps = bigExplosion;
                setTimeout(() => {
                    props.onComplete();
                }, confettiProps.duration / 2)
            }
            setIsExploding(true);
        }
        setTimeout(() => {
            setIsExploding(false);
        }, confettiProps.duration)

        setAccuracy(correctPercent);
    }

    return (
        <div className=" w-full h-full flex flex-col items-center">
            <div className=" text-[50px] text-white text-center mt-2">
                {/* Display question prop */}
                Recreate the design!
            </div>
            <div className="flex w-full justify-center">
                <div className="p-[10px] rounded-l-lg bg-[#282C34] text-[20px]">
                    <CodeMirror
                        width='calc(50vw - 85px)'
                        height="calc(100vh - 220px)"
                        theme="dark"
                        options={{
                            tabSize: 1,
                            mode: "htmlmixed",
                        }}
                        onChange={(value, viewUpdate) => {
                            setIsExploding(false);
                            setCode(value);
                            if (compareDesignsTime) clearTimeout(compareDesignsTime);

                            compareDesignsTime = setTimeout(compareDesigns, 500);
                        }}
                    />
                </div>
                <div id="resultContainer" className="rounded-r-lg bg-[#282C34] w-[calc(50vw-65px)] h-[calc(100vh-200px)] flex justify-center items-center" >
                    <div className="flex flex-col">
                        <div className="rounded relative item-center justify-center p-[10px] bg-[#2C313A] flex-grow w-[calc(50vw-145px)] h-[calc(100vh-310px)]">
                            <iframe srcdoc={`<div style="width:100%;height:100%;">${code}</div>`} id="codeResult" className="absolute rounded-lg shadow-inner-lg w-[calc(50vw-165px)] h-[calc(100vh-310px)]">
                            </iframe>
                            <iframe srcdoc={`<div  style="width:100%;height:100%">${props.correctCode}</div>`} id="correctCode" className="absolute w-[calc(50vw-165px)] h-[calc(100vh-310px)] opacity-50">
                            </iframe>
                        </div>
                        <div className="text-white self-center text-[30px] h-[90px] pt-[20px]">
                            {/* {accuracy} */}
                            <StarDisplay fill="#282C34" stroke="#191b1f" className="w-[150px]" width={150} amount={Math.floor(accuracy / 33.33)} />
                            <div className="ml-[67px] -mt-[40px]">
                                {isExploding && <ConfettiExplosion {...confettiProps} />}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"absolute left-[100vw] w-[calc(50vw-165px)] h-[calc(100vh-310px)]"}>
                    {/* Hidden elements for accuracy calculating */}
                    <iframe srcdoc={`<div style="width:100%;height:calc(100vh - 310px);">${props.defaultBackground}</div>`} id="correctBackground" className="absolute w-full h-full" />
                    <iframe srcdoc={`<div style="width:100%;height:calc(100vh - 310px);">${props.correctCode}</div>`} id="hiddenCorrect" className="absolute w-full h-full" />
                </div>
            </div>

        </div >
    );
}
export default ChallengeQuestion;
