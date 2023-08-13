import React from 'react';
import style from "./Input.module.css";
import { InputProps } from "./index";
// import { getBackground } from "../../utils";

export default function CheckBox({ bgColor, ...props }: InputProps) {
    return <label className={style["input-container-checkbox"]}>
        <input type="checkbox" name="name" placeholder=" " {...props} />
        <span>Input</span>
    </label>
}

// return <label className={style["input-container"]}
// style={{ '--input-container-bg-color': bgColor } as React.CSSProperties}>
// <input type="checkbox" name="name" placeholder=" " {...props} />
// <span>Input</span>
// </label>
