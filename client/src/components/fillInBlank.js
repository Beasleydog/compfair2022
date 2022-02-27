import React, { useState, useRef, useEffect } from "react";
import Button from "./button.js";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";

const theme = vs2015;
console.log(theme);
function FillInBlank(props) {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-[1000px] h-[500px] bg-blue">
        <div className="text-[50px] text-white text-center">
          {props.question}
        </div>
        <div className="w-[500px] ml-8 mt-32 justify-center">
          <SyntaxHighlighter
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
            {props.codeText || "var one = 2;"}
          </SyntaxHighlighter>
        </div>
        <div className="w-64 text-white tracking-tight break-normal text-[25px] text-left mt-4 ml-[700px]">
          This is a test answer
        </div>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-64 -mt-2 ml-[700px]"
          type="text"
          placeholder="Type Here"
        ></input>
      </div>
    </div>
  );
}

export default FillInBlank;
