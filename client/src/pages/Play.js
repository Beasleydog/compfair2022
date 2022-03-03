import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import MouseBlurEffect from "../components/mouseBlurEffect.js"
import MultipleChoiceQuestion from "../components/multipleChoiceQuestion.js";
import fillInBlank from "../components/fillInBlank";
import BlurBackground from "../components/blurBackground.js";
import { getLevelData } from "../levels/index.js";
import Button from "../components/button.js";
import FillInBlank from "../components/fillInBlank";
function Play() {
    const { attemptNumber, id, mode, number } = useParams();
    const [popupOpen, setPopup] = useState(false);
    const [correct, setCorrect] = useState(false);
    const [popupText, setText] = useState('');
    let levelData = getLevelData(id);

    useEffect(() => {
        //set popup text based off of mode
        if (mode == "info") {
            setText(levelData.info);
            setPopup(true);
        } else if (mode == "multi") {
            setText(levelData.mcQuestions[number].explanation);
        } else if (mode == "open") {
            setText(levelData.openQuestions[number].explanation);
        }
    }, []);
    console.log(levelData);
    return (
        <div>
            <div className="font-main bg-black overflow-hidden w-screen h-screen flex items-center justify-center">
                <div className="w-[calc(100vw-160px)] h-[calc(100vh-160px)] rounded-lg backdrop-blur-2xl shadow-lg bg-[#00000075] z-10">

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
                </div>
                <div onClick={() => window.location.replace("/levels")} className="text-white absolute top-[24px] left-[24px] z-10 text-[70px] leading-[38px] h-[38px] cursor-pointer">
                    ×
                </div>
            </div >
            {popupOpen && <div className="absolute top-0 left-0 w-screen h-screen backdrop-blur-[10px] z-[100]">
                <div className={`absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] 
                    z-[100] h-[calc(100vh-190px)]  bg-[#2B3131] rounded-lg
                    flex flex-col items-center`} >
                    <div className="w-full h-[120px] text-[87px] text-center">
                        {mode == "info" ? "❔" : (correct ? "✅" : "❌")}
                    </div>
                    <div className="overflow-y-scroll flex-grow py-10 text-[22px] text-white font-bold mx-[150px]">
                        {popupText.split("\n").map((x) => { return (<div><div>{x}</div><br /></div>) })}
                    </div>
                    <Button text="Ok" className="mb-[20px]" onClick={() => {
                        //Set "Ok" button logic
                        if (mode == "info") {
                            //User finished info, redirect back
                            finishSection(id, mode, attemptNumber);
                            window.location.replace("/levels");
                        } else if (mode == "multi") {
                            if (number == levelData.mcQuestions.length - 1) {
                                //User finished multi, redirect back
                                finishSection(id, mode, attemptNumber);
                                window.location.replace("/levels");
                            } else {
                                //Direct to next question
                                window.location.replace(`/play/${attemptNumber}/${id}/${mode}/${parseInt(number) + 1}`);
                            }
                        } else if (mode == "open") {
                            if (number == levelData.openQuestions.length - 1) {
                                //User finished open ended, try to finish the level
                                let didFail = finishSection(id, mode, attemptNumber);
                                if (didFail != "failed") {
                                    finishLevel(levelData, () => {
                                        window.location.replace("/levels");
                                    });
                                }
                            } else {
                                //Next opne ended
                                window.location.replace(`/play/${attemptNumber}/${id}/${mode}/${parseInt(number) + 1}`);
                            }
                        }
                    }} />
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
async function finishSection(id, mode, attemptNumber) {
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
export default Play;
