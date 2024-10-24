export type PopoverProps = {
    children?: ReactNode
    placement?: "up" | "down" | "left" | "right"
    label?: string | ReactNode
}

export type ActionListProps = {
    items: ActionListItem[]
    sections?: undefined 
} | {
    items?: undefined
    sections: { title: string, items: ActionListItem[] }[]
}

export type ActionListItem = {
    content: string | ReactNode
    onClick?: () => void
    icon?: ReactNode
    disabled?: boolean
    loading?: boolean
}