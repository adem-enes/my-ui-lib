import React from 'react';
import style from "./Input.module.css";
import { CheckboxProps } from "./index";
// import { getBackground } from "../../utils";

export default function CheckBox({ type = "checkbox", containerStyle, ...props }: CheckboxProps) {
    return <label className={style["input-container-checkbox"]} style={containerStyle}>
        <input type={type ?? "checkbox"} name="name" placeholder=" " {...props} />
        <span>Input</span>
    </label>
}

// return <label className={style["input-container"]}
// style={{ '--input-container-bg-color': bgColor } as React.CSSProperties}>
// <input type="checkbox" name="name" placeholder=" " {...props} />
// <span>Input</span>
// </label>
