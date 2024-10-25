import { useEffect, useRef } from 'react'
import { PopoverProps } from '.'
import styles from './Popover.module.css'

const Popover = ({ children, label, placement = "down" }: PopoverProps) => {
    const detail = useRef<HTMLDetailsElement>(null)
    const popover = useRef<HTMLDivElement>(null)
    const rect = detail.current?.getBoundingClientRect();
    
    const arrange = (rect: DOMRect | undefined) => {
        if (!popover.current || !rect) return

        if (placement === "down") {
            popover.current.style.top = `${rect.y + rect.height + 5}px`;
            popover.current.style.left = `${rect.left - popover.current.offsetWidth + rect.width}px`;
        } else if (placement === "up") {
            popover.current.style.top = `${rect.y - popover.current.offsetHeight - 5}px`;
            popover.current.style.left = `${rect.left - popover.current.offsetWidth + rect.width}px`;
        } else if (placement === "left") {
            popover.current.style.top = `${rect.y}px`;
            popover.current.style.left = `${rect.x - popover.current.offsetWidth - 5}px`;
        } else if (placement === "right") {
            popover.current.style.top = `${rect.y}px`;
            popover.current.style.left = `${rect.x + rect.width + 5}px`;
        }
    }

    useEffect(() => {
        const handleScroll = () => {
            arrange(detail.current?.getBoundingClientRect())
        }
        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [rect]);

    return (
        <details ref={detail} className={styles["popover-container"]} data-popover={placement}>
            <summary className={styles["popover-btn"]}>{label}</summary>
            <div ref={popover} className={styles.popover}>{children}</div>
        </details>
    )
}

export default Popover