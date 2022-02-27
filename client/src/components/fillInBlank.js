import React, { useState, useRef, useEffect } from "react";
import Button from "./button.js";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";

const theme = vs2015;
console.log(theme);
function FillInBlank(props) {
  const [typedText, setText] = useState("");
  const questionCodeText = [props.before, "❌", props.after];
  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-[1000px] h-[500px] bg-blue">
        <div className="text-[50px] text-white text-center">
          {props.question}
        </div>
        <div className="w-[500px] ml-8 mt-32 h-[200px] bg-[#1E1E1E] justify-center items-center shadow">
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
        <div className="w-64 text-white tracking-tight break-normal text-[25px] text-left -mt-32 ml-[700px]">
          {props.question2}
        </div>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-64 -mt-2 ml-[700px]"
          onChange={() => {
            setText(document.getElementById("test").value);
          }}
          id="test"
          type="text"
          placeholder="Type Here"
        ></input>
        <button className="hover:scale-110 hover:shadow-2lx rounded-lg w-32 h-16 ml-[750px] mt-4 border-4 text-white text-[25px] text-center">
          Submit
        </button>
      </div>
    </div>
  );
}

export default FillInBlank;
