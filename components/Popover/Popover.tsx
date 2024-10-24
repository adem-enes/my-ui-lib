import { PopoverProps } from '.'
import styles from './Popover.module.css'

const Popover = ({ children, label, placement = "down" }: PopoverProps) => {
    return (
        <details className={styles["popover-container"]} data-popover={placement}>
            <summary className={styles["popover-btn"]}>{label}</summary>
            <div className={styles.popover}>{children}</div>
        </details>
    )
}

export default Popover