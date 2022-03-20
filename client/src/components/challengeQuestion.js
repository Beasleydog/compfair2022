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
        html2canvas(document.getElementById("codeResult")).then((resultCanvas) => {
            html2canvas(document.getElementById("hiddenCorrect")).then((correctCanvas) => {
                html2canvas(document.getElementById("correctBackground")).then((startCanvas) => {
                    // document.body.appendChild(resultCanvas);
                    // document.body.appendChild(correctCanvas);
                    // document.body.appendChild(startCanvas);
                    compareCanvasAccuracy(resultCanvas, correctCanvas, startCanvas);
                })
            })
        })
    }

    function compareCanvasAccuracy(correctCanvas, userCanvas, startCanvas) {
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
            <iframe srcdoc="<p id='test'>Hello world!</p>" src="demo_iframe_srcdoc.htm"></iframe>
            <div className=" text-[50px] text-white text-center mt-2">
                {/* Display question prop */}
                Recreate the design!
            </div>
            <div className="flex w-full justify-center">
                <div className="p-[10px] rounded-l-lg bg-[#282C34]">
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
                            <div id="codeResult" className="absolute rounded-lg shadow-inner-lg w-[calc(50vw-165px)] h-[calc(100vh-310px)]">
                                {parse(code)}
                            </div>
                            <div id="correctCode" className="absolute w-[calc(50vw-165px)] h-[calc(100vh-310px)] opacity-50">
                                <h1>Test</h1>
                                <h2>Ok</h2>
                            </div>
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
                <div className={"absolute left-[100vw] w-[calc(50vw-165px)] h-[calc(100vh-290px)]"}>
                    {/* Hidden elements for accuracy calculating */}
                    < div id="correctBackground" className="w-full h-full"></div>
                    <div id="hiddenCorrect" className="w-full h-full">
                        <h1>Test</h1>
                        <h2>Ok</h2>
                    </div>
                </div>
            </div>

        </div >
    );
}
export default ChallengeQuestion;
