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

  console.log(allBottomPic);
  console.log(allMidPic);
  console.log(allTopPic);
  if (!localStorage.getItem("username")) {
    //If user is not logged in, redirect to /login
    window.location.replace("/login");
  }

  //Just start off with default character
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

  const [stars, setStars] = useState(0);
  //Default to nothing unlocked
  const [unlockData, setUnlockData] = useState({ top: [], mid: [], bottom: [], face: [] });

  //Get user stars and unlocked items, do it in two functions so requests can be made at same time
  useEffect(() => {
    (async () => {
      let stars = await fetch("/api/getStars", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      stars = await stars.text();
      console.log("SETTING STARS")
      setStars(parseInt(stars));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let unlockData = await fetch("/api/unlockData", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      unlockData = await unlockData.json();
      console.log("SETTING UNLOCK DATA");
      setUnlockData(unlockData);
    })();
  }, []);


  async function setProfilePart(type, id) {
    let prof = profilePicture;
    prof[type] = id;
    console.log("SETTING PROFILE PIC", prof);
    setProfilePicture(prof);
    fetch("/api/setProfile", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ ...prof })
    });
  }
  function PicPart({
    id,
    src,
    req,
    text,
    type,
  }) {
    return (
      <div className="mt-4 ml-4">
        <button
          onClick={async () => {
            if (unlockData[type].includes(id)) {
              //User already unlocked this item, set it to their profile
              setProfilePart(type, id);
            } else {
              if (req > stars) return

              buyItem(type, id, req);

              setProfilePart(type, id);
            }
          }}
          className={stars < req || unlockData[type].includes(id)
            ? "cursor-not-allowed opacity-60"
            : ""
          }
        >
          <img src={src} className="h-[150px] w-[150px]" />
          <div className="text-white text-[50px]">{text}-{req}</div>
        </button>
      </div>
    );
  }
  async function buyItem(type, id, req) {
    console.log("SETTING STARS");
    setStars(stars - req);
    await fetch("/api/buyItem", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        type: type,
        id: id,
        req: req
      })
    });
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
          {stars}
          <DisplayProfilePic data={profilePicture} />
        </div>
        <div className="grid grid-cols-1 gap-2 items-center justify-center h-[1000px] w-[1025px] border-white border-4 rounded-lg p-2 mt-[300px]">
          <ShopSection contents={allBottomPic.map((x, i) => {
            return (
              <PicPart
                key={i}
                id={x.id}
                src={x.src}
                req={x.starReq}
                text={x.name}
                type={x.type}
              />
            );
          })}
          />
          <ShopSection contents={allMidPic.map((x, i) => {
            return (
              <PicPart
                key={i}
                id={x.id}
                src={x.src}
                req={x.starReq}
                text={x.name}
                type={x.type}
              />
            );
          })}
          />
          <ShopSection contents={allTopPic.map((x, i) => {
            return (
              <PicPart
                key={i}
                id={x.id}
                src={x.src}
                req={x.starReq}
                text={x.name}
                type={x.type}
              />
            );
          })} />
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
    </div >
  );
}
function ShopSection({ contents }) {
  return (
    <div className="grid items-center justify-center grid-cols-5 gap-3 h-[250px] w-[1000px] border-white border-4 rounded-lg p-2">
      {contents}
    </div>
  )
}

export default Change;
