import styles from './Message.module.css'

function timeSince(date) {
    const seconds = Math.floor((new Date() - date) / 1000)
    let interval = seconds / 31536000

    if (interval > 1) {
        return Math.floor(interval) + " years"
    }

    interval = seconds / 2592000

    if (interval > 1) {
        return Math.floor(interval) + " months"
    }

    interval = seconds / 86400

    if (interval > 1) {
        return Math.floor(interval) + " days"
    }

    interval = seconds / 3600

    if (interval > 1) {
        return Math.floor(interval) + " hours"
    }

    interval = seconds / 60

    if (interval > 1) {
        return Math.floor(interval) + " minutes"
    }

    return Math.floor(seconds) + " seconds"
}

export default function Message({
    message,
    sender,
    date,
    files = []
}) {
    return (
        <>
            <div className={styles.messageHead}>
                <span className={styles.messageSender}>{sender}</span>
            </div>
            <div className={styles.messageWrap}>
                <span className={styles.messageText}>{message}</span>
                <div className={styles.dateRight}>
                    <span className={styles.messageDate}>{timeSince(date)} ago</span>
                </div>
                {files.map((file, i) => <a key={`${i} file`} rel="noreferrer" className={styles.messageFile} target="_blank" href={file}>File</a>)}
            </div>
        </>
    )
}