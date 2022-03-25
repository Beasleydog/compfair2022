import React from "react";
import { getPicData } from "../profilePictureData";
function DisplayProfilePic({ data, big, background }) {
  return (
    <div className={`flex items-center justify-center z-0 ${big ? `scale-150` : ""}`}>
      <div className="relative">
        {/* Use selected photo, or just use default (id 0) */}
        <img
          src={getPicData("mid", (data ? data.mid : 0)).src}
          className={`drop-shadow-lg object-contain w-[225px] h-[225px] bg-[#0c2439] rounded-full shadow-inner ${background ? background : ''}`}
        />
        <div>
          <img
            src={getPicData("bottom", (data ? data.bottom : 0)).src}
            className="drop-shadow-lg absolute w-[150px] h-[150px] top-[110px] right-[35px]"
          />
          <img
            src={getPicData("top", (data ? data.top : 0)).src}
            className="drop-shadow-lg absolute w-[150px] h-[150px] bottom-[110px] right-[35px]"
          />
        </div>
      </div>
    </div >
  );
}

// Export profile picture
export default DisplayProfilePic;
