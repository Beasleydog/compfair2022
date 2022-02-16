import React, { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="font-main bg-black">
      <div className="sticky top-0 left-0 backdrop-blur shadow-lg font-bold w-full h-[100px] flex items-center z-50">
        <div className="flex items-center -left-px p-6 w-[50vw]">
          <div className="font-main text-white text-[40px]">Debuggers</div>
          <button className="absolute right-12 font-main text-white text-[20px] hover:underline">
            Sign In
          </button>
          <button className="absolute right-40 no-underline font-main text-white text-[20px] hover:underline">
            About
          </button>
        </div>
      </div>

      <div className="top-0 left-0 w-screen flex flex-col">
        {/* content */}

        <Section
          glows={[
            { x: "25%", y: "20%" },
            { x: "-10%", y: "-20%" }
          ]}
          content={
            <div className="flex flex-col gap-6 items-center">
              <div className="break-normal text-white text-[40px] text-center">
                The Free, Fun, And Effective Way To Learn Web Design
              </div>
              <button
                type="button"
                className="text-white text-[25px] rounded-[10px] font-bold py-3 px-6 rounded-boxed border-white border-2 w-max"
              >
                Get started
              </button>
            </div>
          }
          height="h-[calc(100vh-100px)]"
        />
        <Section
          glows={[{ x: "0", y: "0" }]}
          content={
            <div className="w-screen h-screen font-bold flex justify-center items-center">
              <div className="flex flex-col gap-6 items-center">
                <div className="break-normal text-white text-[40px] text-center">
                  The Free, Fun, And Effective Way To Learn Web Design
                </div>
                <button
                  type="button"
                  className="text-white text-[25px] rounded-[10px] font-bold py-3 px-6 rounded-boxed border-white border-2 w-max"
                >
                  Get started
                </button>
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
}
function Section(props) {
  let classString;
  if (props.height) {
    classString = `w-screen ${props.height} overflow-x-clip`;
  } else {
    classString =
      "w-screen h-screen overflow-x-clip";
  }
  return (
    <div className={classString}>
      <div className="z-10 relative left-0 top-0 h-full w-screen">{props.content}</div>
      <div className="blur-2xl top-[-100%] relative w-screen h-full">
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
                backgroundRepeat: "no-repeat"
              }}
            ></div>
          ))
          : ""}
      </div>
    </div>
  );
}
export default Home;
