import { CSSProperties, InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    bgColor?: string,
    variant?: "outlined" | "standard" | "filled",
    containerStyle?: CSSProperties
}
