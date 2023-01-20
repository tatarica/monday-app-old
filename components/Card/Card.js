import Link from 'next/link'
import styles from './Card.module.css'

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export default function Card({
    ID,
    status,
    statuscolour,
    typecolour,
    deadline,
    name,
    type,
    showHelp,
}) {
    const deadlineDate = new Date(deadline)

    return (
        <>
            {showHelp && (
                <div className={styles.cardHelp}>
                    <div className={styles.cardFlex}>
                        <span>Title</span>
                        <span>Deadline</span>
                    </div>
                    <div className={styles.cardHelpStatusFlex}>
                        <div className={styles.cardHelpStatus}>Type</div>
                        <div className={styles.cardHelpStatus}>Status</div>
                    </div>
                </div>
            )}
            <Link href={`/${ID}`}>
                <a className={styles.card}>
                    <div className={styles.cardFlex}>
                        <span>{name}</span>
                        {deadline === "" ? <span className={styles.border + ' ' + styles.missingPad}>-</span> : <span className={styles.border}>{monthNames[deadlineDate.getMonth()]} {deadlineDate.getDate()}</span>}
                    </div>
                    <div className={styles.cardStatusFlex}>
                        <div className={styles.cardStatus} style={{ backgroundColor: typecolour }}>{type}</div>
                        <div className={styles.cardStatus} style={{ backgroundColor: statuscolour }}>{status}</div>
                    </div>
                </a>
            </Link>
        </>
    )
}
