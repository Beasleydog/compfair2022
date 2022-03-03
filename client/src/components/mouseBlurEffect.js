import React, { useState, useRef, useEffect } from "react";

const MouseBlurEffect = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    //Story mouse pos
    useEffect(() => {
        //init event listeners
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
        //update mouse pos
        setPosition({ x: e.clientX, y: e.clientY });
    };

    return <div className="w-[200px] h-[200px] fixed blur scale-[6] bg-center bg-no-repeat bg-[length:75%_75%]"
        style={
            {
                backgroundImage: `radial-gradient(circle, rgba(64,164,244,0.2786064767703957) 0%, rgba(1,11,19,0) 70%)`,
                left: `${position.x - 95}px`,
                top: `${position.y - 95}px`,
                transition: "left .2s, top .2s"
            }
        } />
}
export default MouseBlurEffect;
