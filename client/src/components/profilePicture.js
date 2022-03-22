import React from "react";
import { getPicData } from "../profilePictureData";
function DisplayProfilePic({ data }) {
  return (
    <div className="flex items-center justify-center z-0">
      <div className="relative">
        {/* Use selected photo, or just use default (id 0) */}
        <img
          src={getPicData("mid", data.mid || 0).src}
          className="object-contain w-[225px] h-[225px] bg-[#0c2439] rounded-full shadow-inner"
        />
        <div>
          <img
            src={getPicData("bottom", data.bottom || 0).src}
            className="absolute w-[150px] h-[150px] top-[110px] right-[35px]"
          />
          <img
            src={getPicData("top", data.top || 0).src}
            className="absolute w-[150px] h-[150px] bottom-[110px] right-[35px]"
          />
        </div>
      </div>
    </div >
  );
}

export default DisplayProfilePic;
