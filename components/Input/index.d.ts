import { CSSProperties, InputHTMLAttributes } from "react";

interface GeneralInputProps extends InputHTMLAttributes<HTMLInputElement> {
    containerStyle?: CSSProperties,
    col?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
}

export interface InputProps extends GeneralInputProps {
    bgColor?: string,
    variant?: "outlined" | "standard" | "filled",
}

export interface CheckboxProps extends GeneralInputProps {
    type?: "checkbox"
}

