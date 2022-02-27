import React, { useState, useRef, useEffect } from "react";
import Button from "../components/button.js";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";

const theme = vs2015;
console.log(theme);
function MultipleChoiceQuestion(props) {
  const [selected, setSelected] = useState(undefined);

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="text-[50px] text-white text-center">
        {props.question}
      </div>
      <div className="flex-grow flex justify-around items-center w-full">
        {props.answers.map((x, i) => <MultipleChoiceOption selected={i == selected} key={i} onClick={() => { if (selected == i) { setSelected(undefined) } else { setSelected(i); } }} codeText={x.text} />)}
      </div>
      <div className={`w-min pb-6`}>
        <Button text="Ok" onClick={() => { if (selected == undefined) return; props.onAnswer(selected); }} className={selected == undefined ? "opacity-50 cursor-not-allowed" : ""} />
      </div>
    </div>
  )
}
function MultipleChoiceOption(props) {
  return (
    <div onClick={props.onClick} className={`${props.selected ? "" : "hover:"}scale-110 ${props.selected ? "" : "hover:"}shadow-lg transition-transform cursor-pointer flex items-center justify-center rounded-lg w-[300px] h-[200px] bg-[#1E1E1E]`} >
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
