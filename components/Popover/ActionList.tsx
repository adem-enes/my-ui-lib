import { Fragment } from 'react'
import styles from './Popover.module.css'
import { ActionListItem, ActionListProps } from '.'


const ActionList = ({ items, sections }: ActionListProps) => {
    return (
        <div className={styles['action-list-container']}>
            {items ? items.map((item, index) => <ActionItems key={index} {...item} />) : (
                sections.map((section, index) => (
                    <Fragment key={index}>
                        <div className={styles['section-container']}>
                            <div className={styles['section-title']}>{section.title}</div>
                            <div className={styles['section-action-items']}>
                                {section.items.map((item, index) => <ActionItems key={index} {...item} />)}
                            </div>
                        </div>
                        {sections.length - 1 !== index && <hr />}
                    </Fragment>
                )
                )
            )}
        </div>
    )
}

const ActionItems = ({ content, disabled, icon, loading, onClick }: ActionListItem) => {
    return (
        <div className={styles['action-item']} data-disabled={disabled} data-loading={loading} onClick={onClick}>
            {icon && <span>{icon}</span>}
            <span>{content}</span>
        </div>
    )
}

export default ActionList