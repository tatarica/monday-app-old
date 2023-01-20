import Card from '../Card'
import styles from './MyTickets.module.css'

export default function MyTickets({ myTickets = [], collabTickets = [] }) {
    return (
        <div className={styles.tickets}>
            <h1 className={styles.h1}>My marketing requests</h1>
            {myTickets.length > 0 ? myTickets.map((ticket, i) => <Card key={`my-${ticket.ID}`} {...ticket} showHelp={i === 0} />) : <p>No tickets</p>}
            <h1 className={styles.h1}>Requests I&apos;m a collaborator on</h1>
            {collabTickets.length > 0 ? collabTickets.map((ticket, i) => <Card key={`collab-${ticket.ID}`} showHelp={i === 0} {...ticket} />) : <p>No tickets</p>}
        </div>
    )
}