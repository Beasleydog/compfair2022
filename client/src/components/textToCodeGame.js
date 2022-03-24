import React, { useState, useRef, useEffect } from "react";
import Button from "./button.js";
import CodeMirror from '@uiw/react-codemirror';
import ConfettiExplosion from 'react-confetti-explosion';

let confettiProps = {
    force: 0.4,
    duration: 1000,
    particleCount: 30,
    floorHeight: 500,
    floorWidth: 300,
    colors: [
        "#F2F03F"
    ]
};

let clockLoop;

let questions = [
    {
        "question": `A H1 element with text value of "Hello!"`,
        "answer": "<h1>Hello!</h1>"
    },
    {
        "question": `A H2 element with text value of "Test"`,
        "answer": "<h2>Test</h2>"
    },
]

let checkTimer;

function TextToCode(props) {
    // Store user typed text
    const [timeLeft, setTimeLeft] = useState(30);
    const [activeTimer, setTimerActive] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [isExploding, setIsExploding] = useState(false);
    const [stars, setStars] = useState(0);
    useEffect(() => {
        clockLoop = setInterval(() => {
            console.log(activeTimer, timeLeft);
            // if (!activeTimer) return
            setTimeLeft((timeLeft) => timeLeft - 1);
        }, 1000);
    }, []);
    function checkAnswer(value) {
        console.log(cleanHTML(value), cleanHTML(questions[currentQuestion].answer))
        if (cleanHTML(value) == cleanHTML(questions[currentQuestion].answer)) {
            setStars((stars) => stars + 1);
            setIsExploding(true);
            window.setTimeout(() => {
                setIsExploding(false);
            }, 1000);
        } else {
            // codeBox.className
        }
    }
    return (
        <div className="w-full h-full flex flex-col items-center">
            <div className="text-[50px] text-white text-center mt-10">
                Test
            </div>
            <div className="flex-grow flex w-full justify-around items-center">
                <div id="codeBox" className="">
                    <CodeMirror
                        width='calc(50vw - 150px)'
                        height="calc(100vh - 449px)"
                        theme="dark"
                        options={{
                            tabSize: 1,
                            mode: "htmlmixed",
                        }}
                        onChange={(value, viewUpdate) => {
                            setTimerActive(true);

                            if (checkTimer) clearTimeout(checkTimer);
                            checkTimer = setTimeout(() => {
                                checkAnswer(value);
                            }, 500);
                        }}
                    />
                </div>
                <div className="flex flex-col justify-center items-center gap-6 w-[calc(50vw-150px)]">
                    <div className="w-auto text-white tracking-tight break-normal text-[25px] text-left">
                        {questions[currentQuestion].question}
                    </div>
                </div>

            </div>
            <div className="text-[50px] text-white text-center mt-10">
                {timeLeft}⏰      {stars}⭐
            </div>
            {isExploding && <ConfettiExplosion {...confettiProps} />}
        </div >
    );
}
function cleanHTML(html) {
    return html.toLowerCase().replaceAll("\n", "").replaceAll(" ", "")
}
export default TextToCode;
