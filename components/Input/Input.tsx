import React from "react";
import style from "./Input.module.css";
import { InputProps } from "./index";
import { getBackground } from "../../utils";

const defaultColor = getBackground();

const Input = ({ bgColor = defaultColor, placeholder = "", ...props }: InputProps) => {

    return <label className={style["input-container"]}
        style={{ '--input-container-bg-color': bgColor } as React.CSSProperties}>
        <input type="text" name="name" placeholder=" " {...props} />
        <span>{placeholder}</span>
    </label>
}

export default Input;