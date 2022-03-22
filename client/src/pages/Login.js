import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import MouseBlurEffect from "../components/mouseBlurEffect.js";
import Button from "../components/button.js";
function Login() {
  if (window.localStorage.getItem("username")) {
    //If user is logged in, redirect to levels
    window.location.replace("/levels");
  }
  return (
    <div className="font-main bg-black w-full overflow-hidden">
      <div className="fixed top-0 left-0 backdrop-blur shadow-lg font-bold w-full h-[80px] flex items-center z-50">
        <div className="flex items-center -left-px p-6 w-[50vw]">
          <div className="font-main text-white text-[30px]">Debuggers</div>
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
            <div className="flex items-center justify-center w-full h-full ">
              <div className="rounded-lg flex flex-col gap-6 items-center justify-center w-[350px] h-[450px] backdrop-blur-[20px] shadow bg-[#1e1e1e40]">
                <div className=" text-white text-[40px] text-center font-bold">
                  Welcome back!
                </div>
                <div className="text-white text-[25px] text-left w-[80%]">
                  Username
                </div>
                <input
                  id="user"
                  className="shadow rounded w-[80%] text-gray-700 p-2 -mt-4"
                  type="text"
                  placeholder="Username"
                />
                <div className="text-white text-[25px] text-left w-[80%]">
                  Password
                </div>
                <input
                  id="pass"
                  className="shadow rounded w-[80%] text-gray-700 p-2 -mt-4"
                  type="password"
                  placeholder="Password"
                />
                <Button onClick={login} text="Log In" className="px-2 py-1" />
              </div>
            </div>
          }
        />
      </div>

      <MouseBlurEffect />
    </div>
  );
}
async function login() {
  //Login user
  let response = await fetch("/api/auth", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      username: document.getElementById("user").value,
      password: document.getElementById("pass").value,
    }),
  });
  if (response.status != 200) {
    window.alert("An error has occured");
  } else {
    localStorage.setItem("username", document.getElementById("user").value);
    window.location.replace("/levels");
  }
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
                transform: `scale(3) translate(${glow.x ? glow.x : "0px"},${glow.y ? glow.y : "0px"
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
