import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import BlurBackground from "../components/blurBackground.js";
import FillInBlank from "../components/fillInBlank.js";
function Levels() {
  return (
    <div className="font-main bg-black w-screen h-screen overflow-hidden">
      <UserDisplay name="test" stars="0" />
      <div className="absolute left-[200px] items-center w-[calc(100vw-200px)]">
        <div className="absolute text-white text-[100px] text-center font-bold w-full h-[150px] backdrop-blur z-30">
          Levels
        </div>
        <div className="z-10 top-0 left-0 absolute pt-[150px] h-screen overflow-y-scroll flex flex-col gap-6 items-center w-full">
          <LevelDisplay name="Div" stars="0" />
          <LevelDisplay name="Hey" stars="2" />
          <LevelDisplay name="Did" stars="3" />
          <LevelDisplay name="Thing" stars="1" />
          <FillInBlank
            question="Example question?"
            question2="We testin"
            before="<img>"
            after="<img>"
          />
        </div>
      </div>
      <div className="z-0">
        <BlurBackground
          glows={[
            { x: "5%", y: "5%" },
            { x: "35%", y: "25%" },
            { x: "95%", y: "50%" },
          ]}
        />
      </div>
    </div>
  );
}

function UserDisplay({ name, stars }) {
  if (parseInt(stars) <= 9) {
    var test = "00" + stars;
  } else if (parseInt(stars) <= 99) {
    var test = "0" + stars;
  } else {
    var test = stars;
  }
  return (
    <div className="text-white bg-[#E5E7E920] flex flex-col items-center justify-around fixed left-0 backdrop-blur shadow-lg font-bold w-[250px] content-center h-screen z-50">
      <div className="flex flex-col items-center">
        <img
          src="https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg"
          className="w-[180px] h-[180px] bg-black rounded-full"
        />
        <div className="font-main text-[30px] z-0">{name}</div>
      </div>
      <div className="flex flex-col items-center">
        <div className="font-main text-[30px] top-[260px]">Stars</div>
        <div className="font-main text-[20px] top-[300px]">{test}</div>
      </div>
    </div>
  );
}
function LevelDisplay({ name, stars }) {
  return (
    <div className="flex flex-col justify-center items-center border-white border-4 rounded-lg p-2">
      <div className="z-10 text-white text-[45px] font-bold">{name}</div>
      <div className="grid grid-cols-4 gap-12 my-10">
        <button type="button" className="w-20 h-20">
          <img src="/images/MenuButton.png" />
        </button>
        <button type="button" className="w-20 h-20">
          <img src="/images/MenuButton.png" />
        </button>
        <button type="button" className="w-20 h-20">
          <img src="/images/MenuButton.png" />
        </button>
        <button type="button" className="w-20 h-20">
          <img src="/images/MenuButton.png" />
        </button>
      </div>
      {stars}/3
    </div>
  );
}

export default Levels;
