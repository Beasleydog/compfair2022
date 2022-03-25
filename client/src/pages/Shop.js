//Import required modules
import React, { useState, useReducer, useEffect } from "react";
import BlurBackground from "../components/blurBackground.js";
import {
  getAllBottomPic,
  getAllMidPic,
  getAllTopPic,
} from "../profilePictureData/index.js";
import DisplayProfilePic from "../components/profilePicture.js";

function Shop() {
  // Get all pictures
  const allBottomPic = getAllBottomPic();
  const allMidPic = getAllMidPic();
  const allTopPic = getAllTopPic();

  //Create force update function
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  if (!localStorage.getItem("username")) {
    //If user is not logged in, redirect to /login
    window.location.replace("/login");
  }

  //Just start off with default character
  const [profilePicture, setProfilePicture] = useState({
    top: 0,
    mid: 0,
    bottom: 0,
    face: 0,
  });
  useEffect(() => {
    //Fetch profile data
    (async () => {
      let profile = await fetch("/api/getProfile", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      console.log(profile)
      profile = await profile.json();
      setProfilePicture(profile);
    })();
  }, []);

  const [stars, setStars] = useState(0);
  //Default to nothing unlocked
  const [unlockData, setUnlockData] = useState({
    top: [],
    mid: [],
    bottom: [],
    face: [],
  });

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
      console.log("SETTING STARS");
      setStars(parseInt(stars));
    })();
  }, []);

  async function updateUnlockData() {
    let unlockData = await fetch("/api/unlockData", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    unlockData = await unlockData.json();
    console.log("SETTING UNLOCK DATA");
    setUnlockData(unlockData);
  }
  useEffect(() => {
    updateUnlockData();
  }, []);

  async function setProfilePart(type, id) {
    //Update a part of the profile, both on client and on server
    let prof = profilePicture;
    prof[type] = id;
    setProfilePicture(prof);
    fetch("/api/setProfile", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ ...prof }),
    });

    forceUpdate();
  }
  function PicPart({ id, src, req, text, type }) {
    return (
      <div className="mt-4 ml-4 w-[150px]">
        <button
          onClick={async () => {
            if (unlockData[type].includes(id)) {
              //User already unlocked this item, set it to their profile
              setProfilePart(type, id);
            } else {
              if (req > stars) return;

              let newUnlocks = unlockData;
              newUnlocks[type].push(id);
              setUnlockData(newUnlocks);

              buyItem(type, id, req);

              setProfilePart(type, id);
            }
          }}
          className={stars < req && !unlockData[type].includes(id)
            ? "cursor-not-allowed opacity-60 w-[150px]"
            : "w-[150px]"
          }
        >
          <img
            src={src}
            className={`h-[150px] w-[150px] bg-[#151617] rounded-[50%] shadow ${profilePicture[type] == id
              ? "scale-105 shadow-xl border-[4px] border-[#111213]"
              : ""
              }`}
          />
          <div className="text-white text-[50px]">
            {!unlockData[type].includes(id) ? (
              <div>
                {req}
                <img
                  className="drop-shadow inline w-[49px] -mt-[9px]"
                  src="/images/star.svg"
                />
              </div>
            ) : (
              <div className="text-green">✔</div>
            )}
          </div>
        </button>
      </div>
    );
  }
  async function buyItem(type, id, req) {
    //Buy item, update stars on server and client
    setStars(stars - req);
    await fetch("/api/buyItem", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        type: type,
        id: id,
        req: req,
      }),
    });
    updateUnlockData();
  }

  return (
    <div className="w-screen h-screen">
      <button
        onClick={() => window.location.replace("/levels")}
        className="text-white absolute top-[24px] left-[24px] z-10 text-[70px] leading-[38px] h-[38px] cursor-pointer"
      >
        ×
      </button>
      <div className="flex w-screen h-screen items-center font-main bg-black justify-around">
        <div className="mt-6 z-10 flex flex-col justify-between items-center h-[60vh]">
          <DisplayProfilePic
            big
            data={profilePicture}
            background="bg-[#1a1c1f85]"
          />
          <div className="text-[80px] text-white">
            {stars}
            <img
              className="inline w-[73.15px] -mt-[15px]"
              src="/images/star.svg"
            />
          </div>
        </div>
        <div className="flex flex-col gap-10 items-center overflow-y-scroll w-[50%] h-[80%] px-3 z-10">
          <ShopSection
            title="Feet"
            contents={allBottomPic.map((x, i) => {
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
          <ShopSection
            title="Bodies"
            contents={allMidPic.map((x, i) => {
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
          <ShopSection
            title="Hats"
            contents={allTopPic.map((x, i) => {
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
        </div>
      </div>
      <div className="absolute w-screen h-full top-0 left-0 pointer-events-none overflow-hidden z-0">
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
function ShopSection({ contents, title }) {
  return (
    <div className="w-full flex flex-col rounded-lg bg-[#1a1c1f] shadow">
      <div className="text-[40px] text-center text-white w-full">
        {title}
      </div>
      <div className="flex justify-left gap-[20px] w-full overflow-x-auto">
        {contents}
      </div>
    </div>
  );
}

//Export Shop
export default Shop;
