import React, useState, useRef, useEffect from "react";

Define MouseBlurEffect(){
    Define position to { x: 0, y: 0 }
    Define setPosition(Parameter x) to set position to x;

    Run Once Ever:
        addEventListeners()
        return removeEventListeners()

    Define addEventListeners:
        Listen for mouse movement

    Define removeEventListeners:
        Stop listening for mouse movement

    Define onMouseMove:
        setPosition(Mouse x, Mouse y)

    Display blur at mouse position
}
export MouseBlurEffect
