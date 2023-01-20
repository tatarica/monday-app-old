import { useState } from 'react'
import axios from 'axios'
import Button from '../Button'
import Message from '../Message'
import styles from './MessagePanel.module.css'

export default function MessagePanel({ messages = [], ticketId }) {
    const [text, setText] = useState('')
    const [commenter, setCommenter] = useState('')
    const [file, setFile] = useState('')
    const [sent, setSent] = useState(false)

    function handleFile(e) {
        setFile(e.target.files[0])
    }

    async function submit(e) {
        e.preventDefault()
        let formData = new FormData()
        const { type, name } = file || {}

        formData.append('file', file)
        formData.append('ticketId', ticketId)
        formData.append('text', text)
        formData.append('commenter', commenter)
        formData.append('name', name)
        formData.append('type', type)
        await axios({
            url: 'https://hook.integromat.com/gw3uy4chwphfkhigvw9qaetbkxck1ich',
            method: 'POST',
            data: formData
        })
        setFile('')
        setText('')
        setCommenter('')
        setSent(true)
        e.target.fileInput.value = ''
    }

    return (
        <div className={styles.max}>
            <div className={styles.ticketMessagesDiv}>
                {messages.map((msg, i) => <Message
                    key={`message ${i}`}
                    message={msg.message}
                    sender={msg.sender}
                    date={new Date(msg.date)}
                    files={msg.files}
                />)}
            </div>

            <form className={styles.ticketSubmit} onSubmit={submit}>
                <div className={styles.ticketSender}>
                    <span>Name:</span>
                    <input className={styles.senderInput} type="text" value={commenter} onChange={e => setCommenter(e.target.value)} />
                </div>
                <textarea type="text" placeholder="Write your reply here" value={text} onChange={e => setText(e.target.value)} />
                <p>Add file</p>
                {sent && <span className={styles.ticketSent}>Sent!</span>}
                <div className={styles.submitFlex}>
                    <input className={styles.pad} id="fileInput" type="file" name="file" onChange={handleFile} />
                    <Button className={styles.noMargin} disabled={!text && !file}>Submit</Button>
                </div>
            </form>
        </div>
    )
}