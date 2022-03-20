import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import BlurBackground from "../components/blurBackground.js";
import { useParams } from "react-router-dom";
import {
  getPicData,
  getAllBottomPic,
  getAllMidPic,
  getAllTopPic,
} from "../profilePictureData/index.js";
import DisplayProfilePic from "../components/profilePicture.js";

function Change() {
  const allBottomPic = getAllBottomPic();
  const allMidPic = getAllMidPic();
  const allTopPic = getAllTopPic();
  const [bottomPic, setBottomPic] = useState("");
  const [midPic, setMidPic] = useState("");
  const [topPic, setTopPic] = useState("");
  console.log(allBottomPic);
  console.log(allMidPic);
  console.log(allTopPic);
  if (!localStorage.getItem("username")) {
    //If user is not logged in, redirect to /login
    window.location.replace("/login");
  }
  return (
    <div>
      <div className="flex items-center justify-center font-main bg-black w-screen h-full overflow-hidden z-[100]">
        <button
          onClick={() => window.location.replace("/levels")}
          className="absolute text-white text-[100px] text-center font-bold top-0 left-0"
        >
          X
        </button>
        <div className="absolute top-0 mt-6">
          <DisplayProfilePic />
        </div>
        <div className="grid grid-cols-1 gap-2 items-center justify-center h-[1000px] w-[1025px] border-white border-4 rounded-lg p-2 mt-[300px]">
          <div className="grid items-center justify-center grid-cols-5 gap-3 h-[250px] w-[1000px] border-white border-4 rounded-lg p-2">
            {allBottomPic.map((x) => {
              return (
                <ProfilePic
                  id={x.id}
                  src={x.src}
                  req={x.starReq}
                  text={x.name}
                  type={x.type}
                  setBottomPic={setBottomPic}
                />
              );
            })}
          </div>
          <div className="grid items-center justify-center grid-cols-5 gap-3 h-[250px] w-[1000px] border-white border-4 rounded-lg p-2">
            {allMidPic.map((x) => {
              return (
                <ProfilePic
                  id={x.id}
                  src={x.src}
                  req={x.starReq}
                  text={x.name}
                  type={x.type}
                  setMidPic={setMidPic}
                />
              );
            })}
          </div>
          <div className="grid items-center justify-center grid-cols-5 gap-3 h-[250px] w-[1000px] border-white border-4 rounded-lg p-2">
            {allTopPic.map((x) => {
              return (
                <ProfilePic
                  id={x.id}
                  src={x.src}
                  req={x.starReq}
                  text={x.name}
                  type={x.type}
                  setTopPic={setTopPic}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="absolute w-screen h-full top-0 left-0 pointer-events-none overflow-hidden">
        <BlurBackground
          glows={[
            { x: "15%", y: "55%" },
            { x: "75%", y: "105%" },
          ]}
        />
      </div>
    </div>
  );
}

function ProfilePic({
  id,
  src,
  req,
  text,
  type,
  setBottomPic,
  setMidPic,
  setTopPic,
}) {
  const [unlockFetch, setUnlock] = useState("");
  async function unlockData() {
    let unlocks = await fetch("/api/unlockData", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        id: "",
      }),
    });
    setUnlock(await unlocks.text());
  }
  unlockData();
  console.log(unlockFetch);
  const [starFetch, setStars] = useState("");
  async function starData() {
    let stars = await fetch("/api/stars", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        id: "",
      }),
    });
    setStars(parseInt(await stars.text()));
  }
  starData();
  console.log(starFetch);
  return (
    <div className="mt-4 ml-4">
      <button
        onClick={() => {
          console.log(starFetch);
          if (type == "bottom") {
            console.log("testing");
            localStorage.setItem("picture-bottom", src);
            setBottomPic(src);
            console.log(id);
            //window.location.replace("/levels");
          } else if (type == "mid") {
            localStorage.setItem("picture-mid", src);
            setMidPic(src);
            //window.location.replace("/levels");
          } else if (type == "top") {
            localStorage.setItem("picture-top", src);
            setTopPic(src);
            //window.location.replace("/levels");
          }
          async function setProf() {
            let finish = await fetch("/api/setProfile", {
              headers: {
                "Content-Type": "application/json",
              },
              method: "POST",
              body: JSON.stringify({
                [type]: id,
              }),
            });
          }
          setProf();
          if (starFetch >= req && !unlockFetch.includes("-" + id) && req > 0) {
            async function setStars() {
              let finish = await fetch("/api/addStars", {
                headers: {
                  "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                  stars: -req,
                }),
              });
            }
            setStars();
            async function addUnlock() {
              let finish = await fetch("/api/addUnlock", {
                headers: {
                  "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                  unlockData: id,
                }),
              });
            }
            addUnlock();
          }
        }}
        className={`${
          starFetch < req && !unlockFetch.includes("-" + id) && req > 0
            ? "cursor-not-allowed opacity-60"
            : ""
        }`}
      >
        <img src={src} className="h-[150px] w-[150px]" />
        <div className="text-white text-[50px]">{text}</div>
      </button>
    </div>
  );
}

export default Change;
