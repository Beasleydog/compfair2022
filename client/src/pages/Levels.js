import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import BlurBackground from "../components/blurBackground.js";
import { getAllLevels } from "../levels/index.js";
import { useParams } from "react-router-dom";
import DisplayProfilePic from "../components/profilePicture.js";

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
  </div>)
}


function UserDisplay({ name, stars, profilePicture }) {
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
        <button
          onClick={() => {
            mode: "change";
            window.location.replace(`/change`);
          }}
          className="absolute opacity-0 hover:opacity-100 font-main bg-black text-[30px] px-[30px] py-[30px] right-[10px] z-10"
        >
          test
        </button>
        <DisplayProfilePic data={profilePicture} />
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


// return (
// <<<<<<< HEAD
//   <div className="text-white bg-[#1A1C1F70] flex flex-col items-center justify-around fixed left-0 backdrop-blur shadow-lg font-bold w-[350px] content-center h-screen z-50">
//     <div className="flex flex-col items-center">
//       <img
//         src="/images/logo.png"
//         className="object-contain w-[180px] h-[180px] bg-[#0c2439] rounded-full shadow-inner"
//       />
//       <div className="font-main text-[30px] z-0">{name}</div>
//     </div>
//     <div className="flex flex-col items-center">
//       <div className="font-main text-[30px] top-[260px]">Stars</div>
//       <div className="font-main text-[20px] top-[300px]">{test}</div>
//     </div>
//     <div
//       className="absolute left-0 bottom-0 p-2 text-white"
//       onClick={() => {
//         //logout user
//         fetch("/api/logout", {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//         window.localStorage.clear();
//         window.location.replace("/");
//       }}
//     >
//       Logout
// =======
//       <div>
//         <div className="font-main bg-black w-screen h-screen overflow-hidden">
//           <UserDisplay name={localStorage.getItem("username")} stars="0" />
//           <div className="absolute left-[200px] items-center w-[calc(100vw-200px)]">
//             <div className="absolute text-white text-[100px] text-center font-bold w-full h-[150px] backdrop-blur z-30">
//               Levels
//             </div>
//             <div className="z-10 top-0 left-0 absolute pt-[150px] h-screen overflow-y-scroll flex flex-col gap-6 items-center w-full">
//               {allLevels.map((x, i) => {
//                 if (levelInfo[x.id]) {
//                   let finished = {
//                     info: levelInfo[x.id].infoRead,
//                     mcQuestions: levelInfo[x.id].mcQuestions.finished,
//                     openQuestions: levelInfo[x.id].openQuestions.finished,
//                   };
//                   let failed = {
//                     info: false,
//                     mcQuestions: levelInfo[x.id].mcQuestions.failed,
//                     openQuestions: levelInfo[x.id].openQuestions.failed,
//                   };
//                   return (
//                     <LevelDisplay
//                       id={x.id}
//                       key={i}
//                       name={x.title}
//                       stars={levelInfo[x.id].stars}
//                       finished={finished}
//                       failed={failed}
//                     />
//                   );
//                 } else {
//                   return (
//                     <LevelDisplay
//                       id={x.id}
//                       locked
//                       key={i}
//                       name={x.title}
//                       stars="0"
//                     />
//                   );
//                 }
//               })}
//             </div>
//           </div>
//           <div className="z-0">
//             <BlurBackground
//               glows={[
//                 { x: "5%", y: "5%" },
//                 { x: "35%", y: "25%" },
//                 { x: "95%", y: "50%" },
//               ]}
//             />
//           </div>
// >>>>>>> TestBranch
//         </div>
//       </div>
//       );
// }
function LevelDisplay({ name, stars, locked, finished, failed, unlocked, id }) {
  let failedClass = "border-4 border-red rounded-[50%]";
  let finishClass = "border-4 border-green rounded-[50%]";

  if (!failed) var failed = {};
  if (!finished) var finished = {};
  if (!unlocked) var unlocked = {};

  function playMode(number, id, mode) {
    if (locked) return;
    if (mode == "info" && !unlocked.info) return
    if (mode == "multi" && !unlocked.mcQuestions) return
    if (mode == "open" && !unlocked.openQuestions) return
    if (mode == "challenge" && !unlocked.challenge) return
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
            } w-30 h-30 ${locked || !unlocked.info ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          <img src="/images/Info.png" />
        </button>
        <button
          onClick={() => {
            playMode(randomNumber(), id, "multi");
          }}
          type="button"
          className={`${finished.mcQuestions ? finishClass : ""}${failed.mcQuestions ? failedClass : ""
            } w-30 h-30 ${locked || !unlocked.mcQuestions ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          <img src="/images/MenuButton.png" />
        </button>
        <button
          onClick={() => {
            playMode(randomNumber(), id, "open");
          }}
          type="button"
          className={`${finished.openQuestions ? finishClass : ""}${failed.openQuestions ? failedClass : ""
            } w-30 h-30 ${locked || !unlocked.openQuestions ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          <img src="/images/Keyboard.png" />
        </button>
        <button
          onClick={() => {
            playMode(randomNumber(), id, "challenge");
          }}
          type="button"
          className={`${finished.challenge ? finishClass : ""} w-30 h-30 ${locked || !unlocked.challenge ? "opacity-60 cursor-not-allowed" : ""}`}
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
