import React from "react";

function DisplayProfilePic() {
  console.log("test");
  return (
    <div className="flex items-center justify-center z-0">
      <img
        src={localStorage.getItem("picture-mid")}
        className="object-contain w-[225px] h-[225px] bg-[#0c2439] rounded-full shadow-inner"
      />
      <img
        src={localStorage.getItem("picture-bottom")}
        className="absolute w-[150px] h-[150px] top-[275px]"
      />
      <img
        src={localStorage.getItem("picture-top")}
        className="absolute w-[150px] h-[150px] top-[115px]"
      />
    </div>
  );
}

export default DisplayProfilePic;
