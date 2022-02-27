import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import MouseBlurEffect from "../components/mouseBlurEffect.js";
function Login() {
  return (
    <div className="font-main bg-black w-full overflow-hidden">
      <div className="fixed top-0 left-0 backdrop-blur shadow-lg font-bold w-full h-[80px] flex items-center z-50">
        <div className="flex items-center -left-px p-6 w-[50vw]">
          <div className="font-main text-white text-[30px]">Debuggers</div>
          <button className="absolute right-12 text-white text-[20px] hover:underline">
            Sign In
          </button>
          <button className="absolute right-40 no-underline font-main text-white text-[20px] hover:underline">
            About
          </button>
        </div>
      </div>

      <div className="top-0 left-0 w-full flex flex-col">
        {/* content */}

        <Section
          glows={[
            { x: "25%", y: "20%" },
            { x: "-10%", y: "-20%" },
          ]}
          content={
            <div className="flex items-center justify-center w-full h-full">
              <div className="flex flex-col gap-6 items-center justify-center">
                <div className="flex bg-blue shadow-xl w-[350px] h-[450px] pb-32">
                  <div className="absolute bg-white rounded-full w-16 h-16 my-[1rem] mx-[9rem]"></div>
                  <div className="flex text-white text-[40px] text-center font-bold mx-[7.5rem] my-24">
                    Login
                  </div>
                  <div className="flex text-white text-[25px] text-center my-[11rem] -mx-[18rem]">
                    Username
                  </div>
                  <input
                    className="flex shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-[13rem] mx-[11.5rem] w-[65rem] h-10"
                    type="text"
                    placeholder="Username"
                  />
                  <div className="flex text-white text-[25px] text-center my-[18rem] -mx-[25rem]">
                    Password
                  </div>
                  <input
                    className="flex shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mx-[18.5rem] w-[65rem] my-[20rem] h-10"
                    type="text"
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    className="absolute text-white text-[25px] rounded-[10px] font-bold py-3 px-6 rounded-boxed border-white border-2 w-32 h-16 mt-64 mx-[7rem] mt-[23.5rem]"
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          }
        />
      </div>

      <MouseBlurEffect />
    </div>
  );
}
function Section(props) {
  let classString = "w-full ";
  classString = props.height ? props.height : "h-screen";

  return (
    <div className={classString}>
      <div className="z-10 relative left-0 top-0 h-full w-full">
        {props.content}
      </div>
      <div className="blur-2xl top-[-100%] relative w-full h-full">
        {props.glows
          ? props.glows.map((glow, i) => (
              <div
                key={i}
                className="w-[500px] h-[500px] absolute"
                style={{
                  backgroundImage: `radial-gradient(circle, rgba(64,164,244,0.6786064767703957) 0%, rgba(1,11,19,0) 70%)`,
                  transform: `scale(3) translate(${glow.x ? glow.x : "0px"},${
                    glow.y ? glow.y : "0px"
                  })`,
                  backgroundSize: "75% 75%",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
            ))
          : ""}
      </div>
    </div>
  );
}
function GetStartedButton(props) {
  return (
    <button
      type="button"
      className="text-white text-[25px] rounded-[10px] font-bold py-3 px-6 rounded-boxed border-white border-2 w-max"
    >
      Login
    </button>
  );
}

export default Login;
