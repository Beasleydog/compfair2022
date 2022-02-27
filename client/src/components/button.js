import React, { useState, useRef, useEffect } from "react";

const Button = (props) => {
    return <button
        type="button"
        onClick={props.onClick}
        className={`text-white text-[25px] rounded-[10px] font-bold py-3 px-6 rounded-boxed border-white border-2 w-max ${props.className}`}
    >
        {props.text}
    </button>
}
export default Button;
