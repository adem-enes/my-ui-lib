import React, { useEffect, useRef } from "react";
import styles from "./Input.module.css";
import { InputProps } from "./index";
import { getBackground, findClosestBackground } from "../../utils";


const Input = ({ bgColor, variant = "outlined", placeholder = "", containerStyle, ...props }: InputProps) => {
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
        inputClassName = styles["input-outlined"];
    } else if (variant === "filled") {
        inputClassName = styles["input-filled"];
    } else if (variant === "standard") {
        inputClassName = styles["input-standard"];
    }

    return <label className={styles["input-container"]} ref={inputRef} style={containerStyle}>
        <input type="text" name="name" placeholder=" "
            className={inputClassName + (props.className ? (" " + props.className) : "")} {...props} />
        <span>{placeholder}</span>
    </label>
}

export default Input;