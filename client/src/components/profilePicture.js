import React from "react";

function DisplayProfilePic({ bottom, mid, top }) {
  return (
    <div className="flex items-center justify-center z-0">
      <div className="relative">
        <img
          src={`${!!mid ? mid : localStorage.getItem("picture-mid")}`}
          className="object-contain w-[225px] h-[225px] bg-[#0c2439] rounded-full shadow-inner"
        />
        <div>
          <img
            src={`${!!bottom ? mid : localStorage.getItem("picture-bottom")}`}
            className="absolute w-[150px] h-[150px] top-[110px] right-[35px]"
          />
          <img
            src={`${!!top ? mid : localStorage.getItem("picture-top")}`}
            className="absolute w-[150px] h-[150px] bottom-[110px] right-[35px]"
          />
        </div>
      </div>
    </div>
  );
}

export default DisplayProfilePic;
