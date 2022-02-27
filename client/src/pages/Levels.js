import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

function Levels() {
  return (
    <div className="font-main bg-[#11334E] w-screen h-screen overflow-hidden">
      <UserDisplay name="test" stars="0" />
      <div className="absolute text-white text-[100px] text-center font-bold w-full h-[150px] backdrop-blur-lg z-30">
        Levels
      </div>
      <div className="z-0 top-0 left-0 absolute pt-[150px] h-screen overflow-y-scroll flex flex-col gap-6 items-center w-full">
        <LevelDisplay name="Div" stars="0" />
        <LevelDisplay name="Hey" stars="2" />
        <LevelDisplay name="Did" stars="3" />
        <LevelDisplay name="Thing" stars="1" />
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
    <div className="fixed justify-center left-0 backdrop-blur shadow-lg font-bold w-[200px] content-center h-screen flex z-50">
      <div className="absolute font-main text-black text-[30px] top-0 z-0">
        {name}
      </div>
      <div className="absolute bg-black rounded-full px-[100px] py-[100px] left-[25px] top-12" />
      <div className="absolute font-main text-black text-[30px] top-[260px]">
        Stars
      </div>
      <div className="absolute font-main text-black text-[20px] top-[300px]">
        {test}
      </div>
    </div>
  );
}
function LevelDisplay({ name, stars }) {
  return (
    <div className="flex flex-col justify-center items-center border-white border-4 rounded-lg p-2">
      <div className="z-10 text-white text-[45px] font-bold">
        {name}
      </div>
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
