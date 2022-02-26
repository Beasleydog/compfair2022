import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import MouseBlurEffect from "../components/mouseBlurEffect.js"
import MultipleChoiceQuestion from "../components/multipleChoiceQuestion.js";
import BlurBackground from "../components/blurBackground.js";
function Play() {
    const { id, mode } = useParams();
    alert(id, mode);
    return (
        <div>
            <div className="font-main bg-black overflow-hidden w-screen h-screen flex items-center justify-center">
                <div className="w-[calc(100vw-160px)] h-[calc(100vh-160px)] rounded-lg backdrop-blur-2xl shadow-lg bg-[#00000075] z-10">
                    <MultipleChoiceQuestion question="Example question?" answers={[
                        { codeText: `<div>\n  ok\n</div>` },
                        { codeText: `<b>\n  lol\n</b>` },
                        { codeText: `<b>\n  lol\n</b>` },
                    ]} />
                </div>
                <div className="text-white absolute top-[24px] left-[24px] z-10 text-[70px] leading-[38px] h-[38px] cursor-pointer">
                    ×
                </div>
            </div >
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
export default Play;
