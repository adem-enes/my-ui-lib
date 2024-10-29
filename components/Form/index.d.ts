import { FormHTMLAttributes, ReactNode } from "react";

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
    children: ReactNode,
    onSubmit: () => void,
    onReset?: () => void, // Optional callback for form reset
    hasBorder?: boolean,
}
