import { ReactNode, TableHTMLAttributes } from "react"

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
    headers: tableHeaders[],
    items: tableItems[],
    searchable?: boolean,
    footer?: ReactNode,
    caption?: string
}

export type tableHeaders = {
    name: string,
    value: string,
    sortable?: boolean,
    isShown?: boolean,
    align?: "center" | "left" | "right" | "justify" | "char" | undefined,
    cellRenderer?: (value: string) => string | ReactNode | undefined
}

export type tableItems = {
    [key: string]: any; // This allows any property name and value
};