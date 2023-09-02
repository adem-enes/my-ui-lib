import React, { useEffect, useRef } from "react";
import style from "./Input.module.css";
import { InputProps } from "./index";
import { getBackground, findClosestBackground } from "../../utils";


const Input = ({ bgColor, variant = "outlined", placeholder = "", ...props }: InputProps) => {
    const inputRef = useRef<HTMLLabelElement | null>(null);

    useEffect(() => {
        const defaultColor = bgColor || findClosestBackground(inputRef.current);
        // Apply the default color directly to the CSS variable.
        if (inputRef.current) {
            inputRef.current.style.setProperty('--input-background-color', defaultColor);
        }
    }, [bgColor])

    let inputClassName;
    if (variant === "outlined") {
        inputClassName = style["input-outlined"];
    } else if (variant === "filled") {
        inputClassName = style["input-filled"];
    } else if (variant === "standard") {
        inputClassName = style["input-standard"];
    }

    return <label className={style["input-container"]} ref={inputRef}>
        <input type="text" name="name" placeholder=" "
            className={inputClassName + (props.className ? (" " + props.className) : "")} {...props} />
        <span>{placeholder}</span>
    </label>
}

export default Input;