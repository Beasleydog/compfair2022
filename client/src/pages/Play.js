import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import MouseBlurEffect from "../components/mouseBlurEffect.js"
import MultipleChoiceQuestion from "../components/multipleChoiceQuestion.js";
import fillInBlank from "../components/fillInBlank";
import BlurBackground from "../components/blurBackground.js";
import { getLevelData } from "../levels/index.js";
import Button from "../components/button.js";
import FillInBlank from "../components/fillInBlank";
import ChallengeQuestion from "../components/challengeQuestion.js";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";

const theme = vs2015;

function Play() {
    const { attemptNumber, id, mode, number } = useParams();
    const [popupOpen, setPopup] = useState(false);
    const [correct, setCorrect] = useState(false);
    const [popupText, setText] = useState('');
    const [focused, setFocused] = useState(0);
    let levelData = getLevelData(id);
    console.log(popupText);
    console.log(typeof popupText)
    useEffect(() => {
        //set popup text based off of mode
        if (mode == "info") {
            setText(levelData.info);
            setPopup(true);
        } else if (mode == "multi") {
            setText(levelData.mcQuestions[number].explanation);
        } else if (mode == "open") {
            setText(levelData.openQuestions[number].explanation);
        } else if (mode == "challenge") {
            setText(levelData.challenge.explanation);
        }
    }, []);
    console.log(levelData);
    return (
        <div>
            <div className="font-main bg-black overflow-hidden w-screen h-screen flex items-center justify-center">
                <div className={`${mode == "challenge" ? "w-[calc(100vw-100px)] h-[calc(100vh-100px)]" : "w-[calc(100vw-160px)] h-[calc(100vh-160px)]"} rounded-lg backdrop-blur-2xl shadow-lg bg-[#00000075] z-10`}>


                    {/* Load question based off of mode */}
                    {mode == "info"}

                    {mode == "multi" && (<MultipleChoiceQuestion
                        onAnswer={(answer) => {
                            let gotRight = levelData.mcQuestions[number].answers.filter((x) => { return x.id == answer })[0].correct;
                            setCorrect(gotRight);
                            setPopup(true);
                            if (!gotRight) {
                                gotWrong(id, mode, attemptNumber);
                            }
                        }}
                        question={levelData.mcQuestions[number].question}
                        answers={levelData.mcQuestions[number].answers} />)}

                    {mode == "open" && <FillInBlank
                        onAnswer={(answer) => {
                            let gotRight = levelData.openQuestions[number].answer == answer;
                            setCorrect(gotRight);
                            setPopup(true);
                            if (!gotRight) {
                                gotWrong(id, mode, attemptNumber);
                            }
                        }}
                        instructions={levelData.openQuestions[number].instructions}
                        codeText={levelData.openQuestions[number].codeText}
                        question={levelData.openQuestions[number].question}
                    />}
                    {mode == "challenge" && <ChallengeQuestion
                        correctCode={levelData.challenge.correctCode}
                        defaultBackground={
                            levelData.challenge.defaultBackground
                        }
                        onComplete={() => {
                            setCorrect(true);
                            setPopup(true);
                        }}
                    />}
                </div>
                <div onClick={() => window.location.replace("/levels")} className={`text-white absolute ${mode == "challenge" ? "top-[8px] left-[8px]" : "top-[24px] left-[24px]"} z-10 text-[70px] leading-[38px] h-[38px] cursor-pointer`}>
                    ×
                </div>
            </div >
            {popupOpen && <div className="absolute top-0 left-0 w-screen h-screen backdrop-blur-[10px] z-[100]">
                <div className={`absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] 
                    z-[100] h-[calc(100vh-80px)]  bg-[#2B3131] rounded-lg
                    flex flex-col items-center`} >
                    <div className="w-full h-[120px] text-[87px] text-center">
                        {/* Set correct emoji */}
                        {mode == "info" ? "❔" : (correct ? "✅" : "❌")}
                    </div>
                    <div className="overflow-y-scroll flex-grow py-10 text-[22px] text-white font-bold mx-[150px]">
                        {/* Set popup text */}
                        {/* {mode == "info" ? */}
                        {infoTextToHTML(typeof popupText == "object" ? popupText[focused] : popupText)}

                    </div>
                    <div className="flex gap-2">
                        {(mode == "info" && focused > 0) &&
                            <Button text="Back" className="mb-[20px]" onClick={() => {
                                setFocused(focused => focused - 1);
                            }} />
                        }
                        <Button text={focused == popupText.length - 1 ? "Finish" : "Next"} className="mb-[20px]" onClick={() => {
                            //Set "Ok" button logic
                            if (mode == "info") {
                                if (focused != popupText.length - 1) {
                                    setFocused(focused => focused + 1);
                                } else {
                                    //User finished info, redirect back
                                    finishSection(id, mode, attemptNumber, () => {
                                        window.location.replace("/levels");
                                    });
                                }
                            } else if (mode == "multi") {
                                if (number == levelData.mcQuestions.length - 1) {
                                    //User finished multi, redirect back
                                    finishSection(id, mode, attemptNumber, () => {
                                        window.location.replace("/levels");
                                    });
                                } else {
                                    //Direct to next question
                                    window.location.replace(`/play/${attemptNumber}/${id}/${mode}/${parseInt(number) + 1}`);
                                }
                            } else if (mode == "open") {
                                if (number == levelData.openQuestions.length - 1) {
                                    //User finished open ended, redirect back
                                    finishSection(id, mode, attemptNumber, () => {
                                        if (!levelData.challenge) {
                                            finishLevel(levelData, () => {
                                                window.location.replace("/levels");
                                            });
                                        } else {
                                            window.location.replace("/levels");
                                        }
                                    });
                                } else {
                                    //Next opne ended
                                    window.location.replace(`/play/${attemptNumber}/${id}/${mode}/${parseInt(number) + 1}`);
                                }
                            } else if (mode == "challenge") {
                                finishSection(id, mode, attemptNumber, () => {
                                    finishLevel(levelData, () => {
                                        window.location.replace("/levels");
                                    });
                                });

                            }
                        }} />
                    </div>
                </div>
            </div>}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                <BlurBackground glows={
                    [
                        { x: '75%', y: '75%' },
                        { x: '35%', y: '25%' },
                        { x: '-5%', y: '100%' }
                    ]
                } />
            </div>

        </div>
    );
}
async function finishLevel(levelData, callback) {
    //Finish a level
    console.log(levelData);
    fetch("/api/unlockLevel", {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            id: levelData.unlockNext,
        })
    })
    console.log('af');
    if (callback) {
        callback();
    }
}
async function finishSection(id, mode, attemptNumber, callback) {
    //Set a section as finished
    let finish = await fetch("/api/finishSection", {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            id: id,
            mode: mode,
            attemptNumber: attemptNumber
        })
    });
    finish = await finish.text();
    if (callback) callback();
    return finish;
}
function gotWrong(id, mode, attemptNumber) {
    //Fail the level for the user
    console.log(id, mode, attemptNumber);
    fetch("/api/failSection", {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            id: id,
            mode: mode,
            attemptNumber: attemptNumber
        })
    })
}
function infoTextToHTML(text) {
    let splitList = [];
    text.split("<CODE>").forEach((x) => {
        if (x.indexOf("</CODE>") != -1) {
            splitList.push({
                code: x.split("</CODE>")[0]
            });
            splitList.push(x.replace("<CODE>", "").replace("</CODE>", "").replace(x.split("</CODE>")[0], ""));
        } else {
            splitList.push(x);
        }
    });

    let htmlList = [(<div className="w-[50vw]"></div>)];
    console.log(splitList);
    splitList.forEach((x) => {
        if (typeof (x) == "string") {
            x.split("\n").forEach((x) => {
                htmlList.push(
                    <div>
                        <div>{x}</div>
                        <div className="h-[15px]"></div>
                    </div>
                )
            })
        } else {
            htmlList.push(
                <div className="bg-[#1E1E1E] p-1 m-2 rounded">
                    <SyntaxHighlighter
                        customStyle={{
                            lineHeight: "1",
                            fontSize: "1em",
                        }}
                        codeTagProps={{
                            style: {
                                lineHeight: "inherit",
                                fontSize: "inherit",
                            },
                        }}
                        language="html"
                        style={theme}
                        lineProps={{
                            style: {
                                wordBreak: "break-all",
                                whiteSpace: "pre-wrap",
                            },
                        }}
                        wrapLines>
                        {x.code}
                    </SyntaxHighlighter>
                </div>
            )
        }
    });
    console.log(htmlList);
    return htmlList;

}
export default Play;
