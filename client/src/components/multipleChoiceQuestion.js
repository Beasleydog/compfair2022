import React, { useState, useRef, useEffect } from "react";
import Button from "../components/button.js";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const theme = vs2015;
console.log(theme)
function MultipleChoiceQuestion(props) {
    return (
        <div className="w-full h-full flex flex-col items-center">
            <div className="text-[50px] text-white text-center">
                {props.question}
            </div>
            <div className="flex-grow flex justify-around items-center w-full">
                {props.answers.map((x) => <MultipleChoiceOption codeText={x.codeText} />)}
            </div>
            <div className="w-min pb-6">
                <Button text="Ok" />
            </div>
        </div>
    )
}
function MultipleChoiceOption(props) {
    return (
        <div className={`hover:scale-110 hover:shadow-2lx transition-transform cursor-pointer flex items-center justify-center rounded-lg shadow w-[300px] h-[200px] bg-[#1E1E1E]`} >
            <SyntaxHighlighter customStyle={{
                lineHeight: "1",
                fontSize: "2em"
            }}

                codeTagProps={{
                    style: {
                        lineHeight: "inherit",
                        fontSize: "inherit"
                    }
                }}
                language="html" style={theme} lineProps={{ style: { wordBreak: 'break-all', whiteSpace: 'pre-wrap' } }} wrapLines>
                {props.codeText || "var one = 2;"}
            </SyntaxHighlighter>
        </div >
    )
}

export default MultipleChoiceQuestion;