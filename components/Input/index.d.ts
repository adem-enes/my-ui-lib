import { CSSProperties, InputHTMLAttributes } from "react";

interface GeneralInputProps extends InputHTMLAttributes<HTMLInputElement> {
    containerStyle?: CSSProperties,
}

export interface InputProps extends GeneralInputProps {
    bgColor?: string,
    variant?: "outlined" | "standard" | "filled",
}

export interface CheckboxProps extends GeneralInputProps {
    type?: "checkbox"
}

