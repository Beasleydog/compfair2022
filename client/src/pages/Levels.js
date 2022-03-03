import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import BlurBackground from "../components/blurBackground.js";
import { getAllLevels } from "../levels/index.js";
function Levels() {
  const [levelInfo, setLevelInfo] = useState([]);
  const allLevels = getAllLevels();
  console.log(allLevels);
  useEffect(() => {
    async function fetchData() {
      //Get users level data
      let levelFetch = await fetch("/api/levelData", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          id: "tefst",
        }),
      });
      levelFetch = await levelFetch.json();
      setLevelInfo(levelFetch);
      console.log(levelFetch);
    }
    fetchData();
  }, []);
  if (!localStorage.getItem("username")) {
    //If user is not logged in, redirect to /login
    window.location.replace("/login");
  }
  return (
    <div className="font-main bg-black w-screen h-screen overflow-hidden">
      <UserDisplay name={localStorage.getItem("username")} stars="0" />
      <div className="absolute left-[200px] items-center w-[calc(100vw-200px)]">
        <div className="absolute text-white text-[100px] text-center font-bold w-full h-[150px] backdrop-blur z-30">
          Levels
        </div>
        <div className="z-10 top-0 left-0 absolute pt-[150px] h-screen overflow-y-scroll flex flex-col gap-6 items-center w-full">
          {allLevels.map((x, i) => {
            if (levelInfo[x.id]) {
              let finished = {
                info: levelInfo[x.id].infoRead,
                mcQuestions: levelInfo[x.id].mcQuestions.finished,
                openQuestions: levelInfo[x.id].openQuestions.finished,
              };
              let failed = {
                info: false,
                mcQuestions: levelInfo[x.id].mcQuestions.failed,
                openQuestions: levelInfo[x.id].openQuestions.failed,
              };
              return (
                <LevelDisplay
                  id={x.id}
                  key={i}
                  name={x.title}
                  stars={levelInfo[x.id].stars}
                  finished={finished}
                  failed={failed}
                />
              );
            } else {
              return (
                <LevelDisplay
                  id={x.id}
                  locked
                  key={i}
                  name={x.title}
                  stars="0"
                />
              );
            }
          })}
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
          src="/images/logo.png"
          className="object-contain w-[180px] h-[180px] bg-[#0c2439] rounded-full shadow-inner"
        />
        <div className="font-main text-[30px] z-0">{name}</div>
      </div>
      <div className="flex flex-col items-center">
        <div className="font-main text-[30px] top-[260px]">Stars</div>
        <div className="font-main text-[20px] top-[300px]">{test}</div>
      </div>
      <div
        className="absolute left-0 bottom-0 p-2 text-white"
        onClick={() => {
          //logout user
          fetch("/api/logout", {
            headers: {
              "Content-Type": "application/json",
            },
          });
          window.localStorage.clear();
          window.location.replace("/");
        }}
      >
        Logout
      </div>
    </div>
  );
}
function LevelDisplay({ name, stars, locked, finished, failed, id }) {
  let failedClass = "border-4 border-red rounded-[50%]";
  let finishClass = "border-4 border-green rounded-[50%]";

  if (!finished) {
    var finished = {};
  }
  if (!failed) {
    var failed = {};
  }

  return (
    <div
      className={`${locked ? "opacity-60 cursor-not-allowed" : ""
        } flex flex-col justify-center items-center border-white border-4 rounded-lg p-2`}
    >
      <div className="z-10 text-white text-[45px] font-bold">{name}</div>
      <div className="grid grid-cols-3 gap-12 my-10 px-[100px]">
        <button
          onClick={() => {
            if (locked) return;
            window.location.replace(`/play/${randomNumber()}/${id}/info/0`);
          }}
          type="button"
          className={`${finished.info ? finishClass : ""}${failed.info ? failedClass : ""
            } w-20 h-20 ${locked ? " cursor-not-allowed" : ""}`}
        >
          <img src="/images/Info.png" />
        </button>
        <button
          onClick={() => {
            if (locked) return;
            window.location.replace(`/play/${randomNumber()}/${id}/multi/0`);
          }}
          type="button"
          className={`${finished.mcQuestions ? finishClass : ""}${failed.mcQuestions ? failedClass : ""
            } w-20 h-20 ${locked ? " cursor-not-allowed" : ""}`}
        >
          <img src="/images/MenuButton.png" />
        </button>
        <button
          onClick={() => {
            if (locked) return;
            window.location.replace(`/play/${randomNumber()}/${id}/open/0`);
          }}
          type="button"
          className={`${finished.openQuestions ? finishClass : ""}${failed.openQuestions ? failedClass : ""
            } w-20 h-20 ${locked ? " cursor-not-allowed" : ""}`}
        >
          <img src="/images/Keyboard.png" />
        </button>
      </div>
      {stars}/3
    </div>
  );
}
function randomNumber() {
  return Math.round(Math.random() * 100000);
}
export default Levels;
