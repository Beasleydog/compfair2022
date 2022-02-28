import React, { useState, useRef, useEffect } from "react";
import Button from "./button.js";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";

const theme = vs2015;
console.log(theme);
function FillInBlank(props) {
  const [typedText, setText] = useState("");
  const questionCodeText = props.codeText;
  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="text-[50px] text-white text-center mt-10">
        {props.question}
      </div>
      <div className="flex-grow flex w-full justify-around items-center">
        <div className="bg-[#1E1E1E] h-[75%] w-[40%] justify-center items-center shadow">
          <SyntaxHighlighter
            id="syntax"
            customStyle={{
              lineHeight: "1",
              fontSize: "2em",
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
            wrapLines
          >
            {questionCodeText[0] +
              (typedText || questionCodeText[1]) +
              questionCodeText[2]}
          </SyntaxHighlighter>
        </div>
        <div className="flex flex-col justify-center items-center gap-6">
          <div className="w-64 text-white tracking-tight break-normal text-[25px] text-left">
            {props.instructions}
          </div>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-64 -mt-2"
            onChange={() => {
              setText(document.getElementById("test").value);
            }}
            id="test"
            type="text"
            placeholder="Type Here"
          ></input>
          <Button text="Submit" onClick={() => {
            if (typedText == "") return;
            props.onAnswer(typedText);
          }} className={typedText == "" ? "opacity-50 cursor-not-allowed" : ""} />
        </div>

      </div>
    </div>
  );
}

export default FillInBlank;
