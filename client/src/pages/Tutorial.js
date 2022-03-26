//Import required modules
import React, { useState, useRef, useEffect } from "react";
import MouseBlurEffect from "../components/mouseBlurEffect.js";
import BlurBackground from "../components/blurBackground.js";
import Button from "../components/button.js";

function Login() {
    return (
        <div className="font-main w-screen h-screen overflow-y-scroll">
            <div className="px-10 z-100">
                <div className="text-[60px] text-white text-center">
                    Tutorial
                </div>
                <br />
                <div className="text-[30px] text-white z-[100]">
                    Welcome to DevBytes! We know how hard it can be to learn HTML and CSS. With DevByte’s fast-paced, fun, and interactive content, you’ll become a master in all things HTML and CSS in no time, DevBytes guarantee!
                    <br />
                    <br />
                    <br />
                    Let's walk through how you are going to complete your first level.
                    <img src="/images/levelOne.png" className="h-[200px]" />
                    <br />
                    <br />
                    Jump in and start learning the basics, you should first click the Info Button to begin.
                    <img src="/images/info.svg" className="h-[100px]" />
                    <br />
                    <br />
                    After reading the Info Section, then it’s time to test yourself! To begin the Multiple Choice Section, click the Multiple Choice Section Button.
                    <img src="/images/menu.svg" className="h-[100px]" />
                    <br />
                    <br />
                    Think you know your stuff? Continue on to the Fill In The Blank Section to prove it!
                    <img src="/images/keyboard.svg" className="h-[100px]" />
                    <br />
                    <br />
                    After learning the content in the Info Section and proving yourself in the Question Sections, it’s then time for the “final boss”. The challenge section!
                    <img src="/images/challenge.svg" className="h-[100px]" />
                    <br />
                    Using the concepts that you learned, recreate the design to achieve a perfect match!
                    <br />
                    <br />
                    <br />
                    Throughout the levels, you will be earning DevStars. Use these stars in the shop to unlock new characters and items!
                    <img src="/images/shop.png" className="h-[100px]" />
                    <br />
                    <br />
                    <br />
                    Have fun and happy learning!
                    <br />
                    <br />
                    <div className="flex align-center justify-center">
                        <Button text={window.location.hash != "" ? "Back" : "Begin"} onClick={() => {
                            window.location.replace(window.location.hash != "" ? "/" : "/levels")
                        }} />
                    </div>
                    <br />
                    <br />
                </div>
            </div>
            <div >
                <div className="absolute w-screen h-full top-0 left-0 pointer-events-none overflow-hidden z-[-1] bg-black">
                    <BlurBackground
                        glows={[
                            { x: "15%", y: "55%" },
                            { x: "75%", y: "105%" },
                        ]}
                    />
                </div>
            </div>
        </div>
    );
}

export default Login;
