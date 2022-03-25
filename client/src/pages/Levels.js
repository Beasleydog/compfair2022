import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import BlurBackground from "../components/blurBackground.js";
import { getAllLevels } from "../levels/index.js";
import { useParams } from "react-router-dom";
import DisplayProfilePic from "../components/profilePicture.js";
import Button from "../components/button.js";
function Levels() {
  const [levelInfo, setLevelInfo] = useState([]);
  const allLevels = getAllLevels();

  const [profilePicture, setProfilePicture] = useState({ top: 0, mid: 0, bottom: 0, face: 0 });
  useEffect(() => {
    (async () => {
      let profile = await fetch("/api/getProfile", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      profile = await profile.json();
      setProfilePicture(profile);
    })();
  }, []);

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
      console.log(levelFetch)
      if (levelFetch.message == "Unauthorized") {
        localStorage.setItem("username", "");
        window.location.replace("/login");
      }
      setLevelInfo(levelFetch);
      setTimeout(() => {
        //Focus on users current level
        document.getElementById("levelContainer").children[Object.values(levelFetch).length - 1].scrollIntoView({ behavior: "smooth", block: "center" });
      }, 10);
    }
    fetchData();
  }, []);

  if (!localStorage.getItem("username")) {
    //If user is not logged in, redirect to /login
    window.location.replace("/login");
  }
  return (<div>
    <div className="font-main bg-black w-screen h-screen overflow-hidden">
      <UserDisplay name={localStorage.getItem("username")} profilePicture={profilePicture} stars="0" />
      <div className="absolute left-[200px] items-center w-[calc(100vw-200px)]">
        <div className="absolute text-white text-[100px] text-center font-bold w-full h-[150px] backdrop-blur z-30">
          Levels
        </div>
        <div id="levelContainer" className="z-10 top-0 left-0 absolute pt-[150px] h-screen overflow-y-scroll flex flex-col gap-6 items-center w-full">
          {allLevels.map((x, i) => {
            if (levelInfo[x.id]) {
              //Get which sections are finished
              let finished = {
                info: levelInfo[x.id].infoRead,
                mcQuestions: levelInfo[x.id].mcQuestions.finished,
                openQuestions: levelInfo[x.id].openQuestions.finished,
                challenge: levelInfo[x.id].challenge.finished
              };

              //Get which sections are failed
              let failed = {
                info: false,
                mcQuestions: levelInfo[x.id].mcQuestions.failed,
                openQuestions: levelInfo[x.id].openQuestions.failed,
                challenge: false
              };

              //Get what sections are unlocked
              let unlocked = {
                info: true,
                mcQuestions: levelInfo[x.id].mcQuestions.unlocked,
                openQuestions: levelInfo[x.id].openQuestions.unlocked,
                challenge: levelInfo[x.id].challenge.unlocked
              };
              return (
                <LevelDisplay
                  id={x.id}
                  key={i}
                  name={x.title}
                  stars={levelInfo[x.id].stars}
                  finished={finished}
                  failed={failed}
                  unlocked={unlocked}
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
      <div
        className="absolute right-2 bottom-0 p-2 text-white z-10 cursor-pointer"
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
  </div>)
}


function UserDisplay({ name, stars, profilePicture }) {
  return (
    <div className="text-white bg-[#E5E7E920] flex flex-col items-center justify-around fixed left-0 backdrop-blur shadow-lg font-bold w-[250px] content-center h-screen z-50">
      <div className="flex flex-col items-center">
        <DisplayProfilePic data={profilePicture} />
        <div className="font-main text-[30px] z-0">{name}</div>
      </div>
      <div className="flex flex-col items-center">
        <img className="drop-shadow w-[69px] -mt-[9px]" src="/images/star.svg" />
        <div className="font-main text-[40px] top-[300px]">{stars}</div>
      </div>
      <Button text="Shop" onClick={() => {
        window.location.replace(`/shop`);
      }} />
    </div>
  );
}


function LevelDisplay({ name, stars, locked, finished, failed, unlocked, id }) {
  let failedClass = "shadow-[0px_0px_7px_6px_#c21616] rounded-[50%]";
  let finishClass = "shadow-[0px_0px_3px_4px_#169016] rounded-[50%]";

  if (!failed) var failed = {};
  if (!finished) var finished = {};
  if (!unlocked) var unlocked = {};

  function playMode(number, id, mode) {
    if (locked) return;
    if (mode == "info" && !unlocked.info) return
    if (mode == "multi" && !unlocked.mcQuestions) return
    if (mode == "open" && !unlocked.openQuestions) return
    if (mode == "challenge" && !unlocked.challenge) return
    // Redirect user
    window.location.replace(`/play/${number}/${id}/${mode}/0`);
  }
  return (
    <div
      className={`${locked ? "opacity-60 cursor-not-allowed" : ""
        } flex flex-col justify-center items-center rounded-lg p-2 bg-[#1a1c1f] shadow-lg`}
    >
      <div className="z-10 text-white text-[45px] font-bold">{name}</div>
      <div style={{ gridTemplateColumns: "repeat(4, minmax(0, 1fr))" }} className="grid gap-12 my-10 px-[100px]">
        <button
          onClick={() => {
            playMode(randomNumber(), id, "info");
          }}
          type="button"
          className={`${finished.info ? finishClass : ""}${failed.info ? failedClass : ""
            } w-[125px] h-[125px] ${locked || !unlocked.info ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          <img className="w-[125px] h-[125px]" src="/images/info.svg" />
        </button>
        <button
          onClick={() => {
            playMode(randomNumber(), id, "multi");
          }}
          type="button"
          className={`${finished.mcQuestions ? finishClass : ""}${failed.mcQuestions ? failedClass : ""
            } w-[125px] h-[125px] ${locked || !unlocked.mcQuestions ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          <img className="w-[125px] h-[125px]" src="/images/menu.svg" />
        </button>
        <button
          onClick={() => {
            playMode(randomNumber(), id, "open");
          }}
          type="button"
          className={`${finished.openQuestions ? finishClass : ""}${failed.openQuestions ? failedClass : ""
            } w-[125px] h-[125px] ${locked || !unlocked.openQuestions ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          <img className="w-[125px] h-[125px]" src="/images/keyboard.svg" />
        </button>
        <button
          onClick={() => {
            playMode(randomNumber(), id, "challenge");
          }}
          type="button"
          className={`${finished.challenge ? finishClass : ""} w-[125px] h-[125px] ${locked || !unlocked.challenge ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          <img className="w-[125px] h-[125px]" src="/images/challenge.svg" />
        </button>
      </div>
      {stars}/8
    </div>
  );
}
function randomNumber() {
  return Math.round(Math.random() * 100000);
}
export default Levels;
