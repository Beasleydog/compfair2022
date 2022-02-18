import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="font-main bg-black w-full overflow-hidden">
      <div className="fixed top-0 left-0 backdrop-blur shadow-lg font-bold w-full h-[80px] flex items-center z-50">
        <div className="flex items-center -left-px p-6 w-[50vw]">
          <div className="font-main text-white text-[30px]">Debuggers</div>
          <button className="absolute right-12 text-white text-[20px] hover:underline">
            Sign In
          </button>
          <button className="absolute right-40 no-underline font-main text-white text-[20px] hover:underline">
            About
          </button>
        </div>
      </div>

      <div className="top-0 left-0 w-full flex flex-col">
        {/* content */}

        <Section
          glows={[
            { x: "25%", y: "20%" },
            { x: "-10%", y: "-20%" }
          ]}
          content={
            <div className="flex items-center justify-center w-full h-full">
              <div className="flex flex-col gap-6 items-center justify-center">
                <div className="break-normal text-white text-[40px] text-center font-bold">
                  The Free, Fun, And Effective Way To Learn Web Design
                </div>
                <GetStartedButton />
              </div>
            </div>
          }
        />
        <Section
          glows={[{ x: "90%", y: "30%" }]}
          content={
            <div className="w-full h-full flex flex-col justify-center items-center text-white pt-5">
              <div className="text-[50px] font-bold">
                Learn
              </div>
              <div className="text-[30px]">
                Learn simple HTML and CSS concepts.
              </div>
              <img src="/images/learnDisplay.jpg" className="bg-white rounded w-[50%] h-auto mt-5" />
            </div>
          }
        />
        <Section
          glows={[{ x: "0", y: "5%" }]}
          content={
            <div className="w-full h-full flex flex-col justify-center items-center text-white pt-5">
              <div className="text-[50px] font-bold">
                Review
              </div>
              <div className="text-[30px]">
                Review concepts with multiple choice and open ended questions.
              </div>
              <img src="/images/reviewDisplay.jpg" className="bg-white rounded w-[50%] h-auto mt-5" />
            </div>
          }
        />
        <Section
          glows={[{ x: "70%", y: "-30%" }, { x: "80%", y: "0" }]}
          content={
            <div className="w-full h-full flex flex-col justify-center items-center text-white pt-5">
              <div className="text-[50px] font-bold">
                Apply
              </div>
              <div className="text-[30px]">
                Complete design challenges to check for understanding.
              </div>
              <img src="/images/applyDisplay.jpg" className="bg-white rounded w-[50%] h-auto mt-5" />
            </div>
          }
        />
        <Section
          glows={[{ x: "0", y: "0" }, { x: "50%", y: "90%" }]}
          content={
            <div className="w-full h-full flex flex-col justify-center items-center text-white pt-5">
              <div className="text-[50px] font-bold">
                Earn
              </div>
              <div className="text-[30px]">
                Earn stars and unlock cosmetics.
              </div>
              <img src="/images/applyDisplay.jpg" className="bg-white rounded w-[50%] h-auto mt-5" />
            </div>
          }
        />

      </div>

      <CursorBlur />
    </div >
  );
}
function Section(props) {
  let classString = "w-full ";
  classString = (props.height ? props.height : "h-screen");

  return (
    <div className={classString}>
      <div className="z-10 relative left-0 top-0 h-full w-full">{props.content}</div>
      <div className="blur-2xl top-[-100%] relative w-full h-full">
        {props.glows
          ? props.glows.map((glow, i) => (
            <div
              key={i}
              className="w-[500px] h-[500px] absolute"
              style={{
                backgroundImage: `radial-gradient(circle, rgba(64,164,244,0.6786064767703957) 0%, rgba(1,11,19,0) 70%)`,
                transform: `scale(3) translate(${glow.x ? glow.x : "0px"},${glow.y ? glow.y : "0px"
                  })`,
                backgroundSize: "75% 75%",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
              }}
            ></div>
          ))
          : ""}
      </div>
    </div>
  );
}
function GetStartedButton(props) {
  return (<button
    type="button"
    className="text-white text-[25px] rounded-[10px] font-bold py-3 px-6 rounded-boxed border-white border-2 w-max"
  >
    Get started
  </button>)
}
const CursorBlur = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    addEventListeners();
    return () => removeEventListeners();
  }, []);

  const addEventListeners = () => {
    document.addEventListener("mousemove", onMouseMove);
  };

  const removeEventListeners = () => {
    document.removeEventListener("mousemove", onMouseMove);
  };

  const onMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  return <div className="w-[200px] h-[200px] fixed blur scale-[6] bg-center bg-no-repeat bg-[length:75%_75%]"
    style={
      {
        backgroundImage: `radial-gradient(circle, rgba(64,164,244,0.4786064767703957) 0%, rgba(1,11,19,0) 70%)`,
        left: `${position.x - 95}px`,
        top: `${position.y - 95}px`,
        transition: "left .2s, top .2s"
      }
    } />
}
export default Home;
