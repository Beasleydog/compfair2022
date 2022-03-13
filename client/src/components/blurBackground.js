import React from "react";

function BlurBackground(props) {
  return (
    <div className="blur-2xl top-[-100%] relative w-full h-full">
      {/* Create glow element for each input */}
      {props.glows
        ? props.glows.map((glow, i) => (
            <div
              key={i}
              className="w-[500px] h-[500px] absolute"
              style={{
                backgroundImage: `radial-gradient(circle, rgba(64,164,244,0.4786064767703957) 0%, rgba(1,11,19,0) 70%)`,
                transform: `scale(3) translate(${glow.x ? glow.x : "0px"},${
                  glow.y ? glow.y : "0px"
                })`,
                backgroundSize: "75% 75%",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          ))
        : ""}
    </div>
  );
}
export default BlurBackground;
