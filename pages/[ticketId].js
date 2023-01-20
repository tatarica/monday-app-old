const axios = require('axios')
import Head from 'next/head'
import { useState } from 'react'
import { RiArrowLeftSLine, RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri'
import { SmallButton } from '../components/Button'
import MessagePanel from '../components/MessagePanel'
import BlueTriangle from '../components/BlueTriangle'

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export default function TicketPage({
    description = 'No description',
    type = '',
    status = '',
    deadline = 0,
    typecolour = '',
    statuscolour = '',
    name = '',
    marketinglead = 'Unassigned',
    ticketId = '',
    messages = [],
}) {
    const [showMessagesPanel, setShowMessagesPanel] = useState(false)
    const [showDescription, setShowDescription] = useState(false)

    const deadlineDate = new Date(deadline)

    return (
        <div>
            <Head>
                <title>My Marketing Requests</title>
                <meta name="description" content="Omnitas portal ticket" />
                <meta name="robots" content="noindex,nofollow" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <svg className="mlogo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 231.5 61.5" enableBackground="new 0 0 231.5 61.5" xmlSpace="preserve">
                <path d="M116.9 50.9h-1.7l-.9-5.8-1.7 4.5h-1.2l-1.7-4.5-.9 5.8h-1.7l1.6-9h1.2l2 5.1 2.1-5.1h1.2l1.7 9zM109.4 35.4h-4.2L93.4 18.6v16.7h-4.5V10.9h4.2L105 27.7V10.9h4.5l-.1 24.5zM139.4 23.2c0 7.6-5.5 12.7-12.8 12.7-7.3 0-12.8-5.2-12.8-12.7 0-7.6 5.5-12.7 12.8-12.7 7.3-.1 12.8 5.1 12.8 12.7zm-20.6 0c0 4.8 3.3 8.2 7.9 8.2 4.6 0 7.9-3.3 7.9-8.2 0-4.8-3.3-8.2-7.9-8.2-4.6 0-7.9 3.3-7.9 8.2zM150.4 25.6h-1.7v9.7h-4.5V10.9h9c4.8 0 7.9 3 7.9 7.4 0 3.6-2.1 6.3-5.7 7.1l7.2 9.9H157l-6.6-9.7zm-1.7-3.9h3.8c2.6 0 3.8-1.2 3.8-3.3 0-2-1.2-3.3-3.8-3.3h-3.8v6.6zM187 23.2c0 7.6-5.3 12.2-12.7 12.2h-7.8V11h7.8c7.4 0 12.7 4.6 12.7 12.2zm-16-8.1v16.2h3.6c4.4 0 7.7-2.8 7.7-8.1s-3.3-8.1-7.7-8.1H171zM196.3 35.4h-4.5V11h4.5v24.4zM201.1 23.2c0-7.7 5.5-12.7 13.2-12.7 3.8 0 6.5 1.2 8.7 2.7l-2.6 3.9c-1.5-1-3.6-2-6.2-2-4.7 0-8.3 3.2-8.3 8.2 0 5 3.5 8.2 8.3 8.2 2.6 0 4.7-1 6.2-2l2.6 3.9c-2.2 1.5-5 2.7-8.7 2.7-7.7-.2-13.2-5.2-13.2-12.9zM88.3 50.2l.7-1.5c.7.4 1.6.8 2.4.8.9 0 1.3-.4 1.3-.9s-.3-.8-.9-1.2l-1.5-1c-1-.7-1.4-1.4-1.4-2.4 0-1.4 1-2.3 2.7-2.3.9 0 1.8.2 2.6.6l-.7 1.5c-.7-.3-1.3-.6-1.9-.6-.7 0-.9.3-.9.7 0 .3.2.6.7.9l1.6 1.1c1 .7 1.5 1.4 1.5 2.5 0 1.7-1.2 2.6-3.1 2.6-1.1.1-2.2-.3-3.1-.8M103.6 49.3v1.5h-5.4v-9h5.4v1.5h-3.7v1.8h3.4v1.5h-3.4v2.6l3.7.1zM122.2 50.9h-1.7v-9h1.7v9z" />
                <path d="M122.2 50.9h-1.7v-9h1.7v9zM125.6 46.4c0-2.9 2-4.7 4.9-4.7 1.4 0 2.4.4 3.2 1l-1 1.4c-.6-.4-1.3-.7-2.3-.7-1.8 0-3.1 1.2-3.1 3s1.3 3 3.1 3c1 0 1.7-.4 2.3-.7l1 1.4c-.8.6-1.8 1-3.2 1-2.9 0-4.9-1.9-4.9-4.7zM145.9 46.4c0 2.8-2.1 4.7-4.7 4.7-2.7 0-4.7-1.9-4.7-4.7s2-4.7 4.7-4.7c2.7-.1 4.7 1.9 4.7 4.7zm-7.6 0c0 1.8 1.2 3 2.9 3s2.9-1.2 2.9-3-1.2-3-2.9-3c-1.7-.1-2.9 1.2-2.9 3zM157 50.9h-1.5l-4.4-6.2v6.2h-1.7v-9h1.5l4.4 6.2v-6.2h1.7v9zM168.7 46.3c0 2.8-2 4.5-4.7 4.5h-2.9v-9h2.9c2.7 0 4.7 1.7 4.7 4.5zm-6-3v6h1.3c1.6 0 2.8-1 2.8-3 0-1.9-1.2-3-2.8-3h-1.3zM179.6 47.3c0 2.3-1.4 3.7-3.7 3.7-2.4 0-3.7-1.5-3.7-3.7v-5.5h1.7v5.4c0 1.3.8 2.1 2 2.1s2-.8 2-2.1v-5.4h1.7v5.5zM183 46.3c0-2.9 2-4.7 4.9-4.7 1.4 0 2.4.4 3.2 1l-1 1.4c-.6-.4-1.3-.7-2.3-.7-1.8 0-3.1 1.2-3.1 3s1.3 3 3.1 3c1 0 1.7-.4 2.3-.7l1 1.4c-.8.6-1.8 1-3.2 1-2.9 0-4.9-1.8-4.9-4.7zM200.4 43.4h-2.5v7.5h-1.7v-7.5h-2.5v-1.5h6.6v1.5zM212.4 46.3c0 2.8-2.1 4.7-4.7 4.7-2.7 0-4.7-1.9-4.7-4.7s2-4.7 4.7-4.7c2.6 0 4.7 1.9 4.7 4.7zm-7.7 0c0 1.8 1.2 3 2.9 3s2.9-1.2 2.9-3-1.2-3-2.9-3c-1.6 0-2.9 1.2-2.9 3zM218.1 47.2h-.6v3.6h-1.7v-9h3.3c1.8 0 2.9 1.1 2.9 2.7 0 1.3-.8 2.4-2.1 2.6l2.7 3.7h-2.1l-2.4-3.6zm-.7-1.4h1.4c1 0 1.4-.5 1.4-1.2s-.5-1.2-1.4-1.2h-1.4v2.4zM228 14v1.3h-.2v-2.8h1.2c.5 0 .9.2.9.7 0 .3-.1.6-.5.7.2.1.5.2.5.7v.7h-.3v-.7c0-.5-.2-.6-.7-.6h-.9zm0-.3h.9c.5 0 .8-.2.8-.6 0-.4-.3-.5-.7-.5h-.9l-.1 1.1z" />
                <path d="M230 15.3h-.4v-.8c0-.4-.1-.5-.7-.5h-.8v1.3h-.4v-3h1.3c.6 0 1 .3 1 .8 0 .3-.1.6-.4.7.2.1.3.4.3.7v.1c0 .3 0 .5.1.7zm-.3-.1h.1v-.6c0-.5-.2-.6-.4-.6l-.3-.1.3-.1c.3-.1.5-.3.5-.6 0-.6-.6-.7-.9-.7h-1.2v2.7h.1v-1.3h1c.5 0 .8.1.8.7V15.2zm-.8-1.4h-1v-1.2h1c.7 0 .8.3.8.6.1.4-.2.6-.8.6zm-.8-.1h.9c.6 0 .7-.3.7-.5 0-.1 0-.4-.7-.4h-.9v.9z" /><g><path d="M228.8 16.5c-1.5 0-2.7-1.2-2.7-2.7 0-1.5 1.2-2.7 2.7-2.7 1.5 0 2.7 1.2 2.7 2.7 0 1.5-1.2 2.7-2.7 2.7zm0-5.1c-1.3 0-2.4 1.1-2.4 2.4 0 1.3 1.1 2.4 2.4 2.4 1.3 0 2.4-1.1 2.4-2.4 0-1.3-1.1-2.4-2.4-2.4z" /><path d="M228.8 16.5c-1.5 0-2.7-1.2-2.7-2.7 0-1.5 1.2-2.7 2.7-2.7s2.7 1.2 2.7 2.7-1.2 2.7-2.7 2.7zm0-5.3c-1.4 0-2.6 1.2-2.6 2.6s1.2 2.6 2.6 2.6c1.4 0 2.6-1.2 2.6-2.6 0-1.4-1.2-2.6-2.6-2.6zm0 5.1c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5zm0-4.8c-1.3 0-2.3 1.1-2.3 2.3s1.1 2.3 2.3 2.3 2.3-1.1 2.3-2.3-1-2.3-2.3-2.3z" /></g><g><path d="M50.2.4s-.1 0-.1.1c-.2.1-.3.1-.5.2l-15 8.6L52 19.4V0c-.5 0-1.2.1-1.8.4z" opacity={.6} fill="#00a9ce" />
                    <path d="m19.6 61 15.8-9.1-17.4-10v19.6c.6 0 1.1-.2 1.6-.5z" opacity={.8} fill="#00a9ce" /><path d="M69.9 50.7 34.2 30.1l-1.7-1L.4 10.6c-.3.6-.4 1.2-.4 1.8v37.3c0 1.2.6 2.2 1.7 2.8l14.7 8.6c.5.3 1.1.4 1.6.4V41.9l33.3 19.2c.1.1.2.1.3.1h.1c1 .4 1.8.1 2.6-.5l5.6-3.2 8.9-5.3c.5-.3.9-.9 1.1-1.5z" opacity={.5} fill="#00a9ce" /><path d="M70.1 26.4v-14c0-1.8-1-3.4-2.5-4.3L54.6.6C53.8.2 53 0 52.1 0v19.4L23 2.5 19.8.7c-1.4-.8-2.7-.9-4.1-.2 0 0-.1 0-.1.1-.2.1-.3.2-.5.3l-5.1 3-7.5 4.2C1.5 8.7.7 9.6.3 10.6l32.2 18.6 1.7 1 35.7 20.6c.2-.7.2-1.9.2-1.9V26.4z" fill="#00a9ce" /></g>
            </svg>
            <svg className="dlogo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 142.4 121.7" enableBackground="new 0 0 142.4 121.7" xmlSpace="preserve"><switch><g><path fill="none" d="M66.3 28.1z" /><path d="M82.9.4s-.1 0-.1.1c-.2.1-.3.2-.5.2L66.8 9.6l18 10.4V0c-.6 0-1.3.2-1.9.4z" opacity={.6} fill="#00a9ce" /><path d="m51.2 63.1 16.4-9.5-18-10.4v20.3c.5.1 1-.1 1.6-.4z" opacity={.8} fill="#00a9ce" /><path d="M103.2 52.5 66.3 31.2l-1.7-1-33.3-19.3c-.2.6-.4 1.2-.4 1.9v38.6c0 1.2.7 2.3 1.7 2.9l15.2 8.9c.5.3 1.1.4 1.7.4V43.3L84 63.2c.1.1.2.1.3.1h.1c1 .4 1.8.1 2.7-.5l5.8-3.3 9.2-5.5c.5-.3.9-.9 1.1-1.5z" opacity={.5} fill="#00a9ce" /><path d="M103.4 27.3V12.8c0-1.9-1-3.6-2.6-4.5L87.4.6c-.8-.4-1.7-.6-2.6-.6v20.1L54.7 2.6 51.3.7c-1.5-.8-2.8-.9-4.3-.2 0 0-.1 0-.1.1-.2.1-.3.2-.5.3L41.1 4l-7.6 4.4c-1 .6-1.8 1.5-2.3 2.6l33.3 19.2 1.7 1 36.9 21.3c.2-.7.2-1.9.2-1.9V27.3z" fill="#00a9ce" /><g>
                <path d="M28.4 121.5h-1.7l-.9-5.8-1.7 4.5H23l-1.7-4.5-.9 5.8h-1.7l1.6-9h1.2l2 5.1 2-5.1h1.2l1.7 9zM21 106.1h-4.1L5 89.5v16.7H.6V81.9h4.1l11.8 16.7V81.9h4.4l.1 24.2zM50.8 94c0 7.5-5.5 12.7-12.7 12.7-7.2 0-12.7-5.1-12.7-12.7 0-7.5 5.5-12.7 12.7-12.7 7.2 0 12.7 5.2 12.7 12.7zm-20.5 0c0 4.8 3.3 8.1 7.8 8.1 4.6 0 7.8-3.3 7.8-8.1s-3.3-8.1-7.8-8.1-7.8 3.3-7.8 8.1zM61.7 96.4H60v9.7h-4.4V81.8h8.9c4.8 0 7.8 3 7.8 7.4 0 3.6-2.1 6.3-5.7 7l7.2 9.9h-5.6l-6.5-9.7zm-1.6-3.9h3.8c2.6 0 3.8-1.2 3.8-3.3 0-2-1.2-3.3-3.8-3.3h-3.8v6.6zM98.1 94c0 7.6-5.3 12.1-12.6 12.1h-7.8V81.8h7.8c7.3 0 12.6 4.6 12.6 12.2zm-15.9-8.1V102h3.5c4.4 0 7.6-2.8 7.6-8s-3.3-8-7.6-8l-3.5-.1zM107.3 106.1h-4.5V81.8h4.5v24.3zM112.1 94c0-7.7 5.4-12.7 13.1-12.7 3.7 0 6.5 1.1 8.7 2.7l-2.6 3.9c-1.5-1-3.5-2-6.1-2-4.7 0-8.2 3.2-8.2 8.1 0 5 3.5 8.1 8.2 8.1 2.6 0 4.6-1 6.1-2l2.6 3.9c-2.2 1.5-4.9 2.7-8.7 2.7-7.6-.1-13.1-5.1-13.1-12.7zM0 120.8l.7-1.5c.7.4 1.6.8 2.4.8.8 0 1.3-.4 1.3-.9s-.3-.8-.9-1.2L2 117c-1-.7-1.4-1.4-1.4-2.4 0-1.4 1-2.3 2.7-2.3.9 0 1.8.2 2.6.6l-.7 1.5c-.7-.3-1.3-.6-1.9-.6-.7 0-.9.3-.9.7 0 .3.2.6.7.9l1.6 1.1c1 .7 1.5 1.4 1.5 2.5 0 1.7-1.2 2.6-3.1 2.6-1.2.1-2.3-.2-3.1-.8M15.2 120v1.5H9.8v-9h5.3v1.5h-3.7v1.8h3.4v1.5h-3.4v2.6h3.8zM33.7 121.5H32v-9h1.7v9z" />
                <path d="M33.7 121.5H32v-9h1.7v9zM37.1 117c0-2.8 2-4.7 4.9-4.7 1.4 0 2.4.4 3.2 1l-.9 1.4c-.6-.4-1.3-.7-2.3-.7-1.7 0-3 1.2-3 3s1.3 3 3 3c1 0 1.7-.4 2.3-.7l.9 1.4c-.8.6-1.8 1-3.2 1-2.9 0-4.9-1.8-4.9-4.7zM57.3 117c0 2.8-2 4.7-4.7 4.7s-4.7-1.9-4.7-4.7 2-4.7 4.7-4.7c2.6 0 4.7 1.9 4.7 4.7zm-7.6 0c0 1.8 1.2 3 2.9 3s2.9-1.2 2.9-3-1.2-3-2.9-3-2.9 1.2-2.9 3zM68.3 121.5h-1.5l-4.4-6.2v6.2h-1.6v-9h1.5l4.4 6.2v-6.2h1.6v9zM79.9 117c0 2.8-2 4.5-4.7 4.5h-2.9v-9h2.9c2.7 0 4.7 1.7 4.7 4.5zm-5.9-3v6h1.3c1.6 0 2.8-1 2.8-3 0-1.9-1.2-3-2.8-3H74zM90.7 117.9c0 2.3-1.3 3.7-3.7 3.7-2.4 0-3.7-1.5-3.7-3.7v-5.4H85v5.3c0 1.3.8 2.1 2 2.1s2-.8 2-2.1v-5.3h1.7v5.4zM94.1 117c0-2.8 2-4.7 4.9-4.7 1.4 0 2.4.4 3.2 1l-.9 1.4c-.6-.4-1.3-.7-2.3-.7-1.7 0-3 1.2-3 3s1.3 3 3 3c1 0 1.7-.4 2.3-.7l.9 1.4c-.8.6-1.8 1-3.2 1-2.8 0-4.9-1.9-4.9-4.7zM111.4 114H109v7.4h-1.6V114h-2.5v-1.5h6.5v1.5zM123.4 117c0 2.8-2 4.7-4.7 4.7s-4.7-1.9-4.7-4.7c0-2.8 2-4.7 4.7-4.7 2.6 0 4.7 1.9 4.7 4.7zm-7.6 0c0 1.8 1.2 3 2.9 3s2.9-1.2 2.9-3-1.2-3-2.9-3-2.9 1.2-2.9 3zM129 117.9h-.6v3.6h-1.6v-9h3.3c1.8 0 2.9 1.1 2.9 2.7 0 1.3-.8 2.3-2.1 2.6l2.7 3.7h-2.1l-2.5-3.6zm-.6-1.4h1.4c.9 0 1.4-.4 1.4-1.2 0-.7-.4-1.2-1.4-1.2h-1.4v2.4zM138.9 84.8v1.3h-.2v-2.8h1.2c.5 0 .9.2.9.7 0 .3-.1.6-.5.7.2.1.5.2.5.7v.7h-.3v-.7c0-.5-.2-.6-.7-.6h-.9zm0-.2h.9c.5 0 .7-.2.7-.6 0-.3-.3-.5-.7-.5h-.9v1.1z" /><path d="M140.9 86.2h-.4v-.8c0-.4-.1-.5-.7-.5h-.8v1.3h-.4v-3h1.3c.6 0 1 .3 1 .8 0 .3-.1.5-.4.7.2.1.3.4.3.7v.1c0 .2 0 .5.1.7zm-.3-.2h.1v-.6c0-.5-.2-.6-.4-.6l-.3-.1.3-.1c.3-.1.5-.3.5-.6 0-.6-.6-.7-.9-.7h-1.2V86h.1v-1.3h1c.5 0 .8.1.8.7V86zm-.8-1.3h-1v-1.2h1c.7 0 .8.3.8.6 0 .4-.3.6-.8.6zm-.8-.2h.8c.6 0 .7-.3.7-.5 0-.1 0-.4-.7-.4h-.8v.9z" /><g><path d="M139.7 87.3c-1.5 0-2.7-1.2-2.7-2.7 0-1.5 1.2-2.7 2.7-2.7 1.5 0 2.7 1.2 2.7 2.7-.1 1.5-1.3 2.7-2.7 2.7zm0-5c-1.3 0-2.4 1.1-2.4 2.4 0 1.3 1.1 2.4 2.4 2.4 1.3 0 2.4-1.1 2.4-2.4 0-1.4-1.1-2.4-2.4-2.4z" /><path d="M139.7 87.4c-1.5 0-2.7-1.2-2.7-2.7 0-1.5 1.2-2.7 2.7-2.7 1.5 0 2.7 1.2 2.7 2.7 0 1.5-1.2 2.7-2.7 2.7zm0-5.3c-1.4 0-2.6 1.2-2.6 2.6 0 1.4 1.2 2.6 2.6 2.6 1.4 0 2.6-1.2 2.6-2.6-.1-1.5-1.2-2.6-2.6-2.6zm0 5c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.2 2.5-2.5 2.5zm0-4.8c-1.3 0-2.3 1-2.3 2.3 0 1.3 1 2.3 2.3 2.3 1.3 0 2.3-1 2.3-2.3s-1-2.3-2.3-2.3z" /></g></g></g></switch>
            </svg>
            <BlueTriangle />
            <div className="ticket-padding">
                <SmallButton className="left" onClick={() => history.back()}><RiArrowLeftSLine size="24" />Back to all marketing requests</SmallButton>
                <div className="ticket-switch">
                    <span className={!showMessagesPanel ? 'active' : ''} onClick={() => setShowMessagesPanel(false)}>Request details</span>
                    <span className={showMessagesPanel ? 'active' : ''} onClick={() => setShowMessagesPanel(true)}>Messages</span>
                </div>
                {showMessagesPanel ? (
                    <main className="ticket-main">
                        <MessagePanel messages={messages} ticketId={ticketId} />
                    </main>
                ) : (
                    <main className="ticket-main">
                        <div className="ticket-left">
                            <p className="ticket-span">Task/Project name</p>
                            <div className="ticket-num-div">
                                <span>{name}</span>
                            </div>

                            <div className="triple-info">
                                <div>
                                    <p className="ticket-span">Deadline</p>
                                    <div className="ticket-num-div">
                                        {deadline === "Deadline missing" ? <span>{deadline}</span> : <span>{monthNames[deadlineDate.getMonth()]} {deadlineDate.getDate()}</span>}
                                    </div>
                                </div>

                                <div className="divider" />

                                <div>
                                    <p className="ticket-span">Request number #</p>
                                    <div className="ticket-num-div">
                                        <span>{ticketId}</span>
                                    </div>
                                </div>

                                <div className="divider" />

                                <div>
                                    <p className="ticket-span">Marketing lead</p>
                                    <div className="ticket-num-div">
                                        <span>{marketinglead}</span>
                                    </div>
                                </div>
                            </div>

                            <p className="ticket-span">Type</p>
                            <div className="ticket-type-div" style={{ backgroundColor: typecolour }}>
                                <span>{type}</span>
                            </div>

                            <p className="ticket-span">Status</p>
                            <div className="ticket-type-div" style={{ backgroundColor: statuscolour }}>
                                <span>{status}</span>
                            </div>

                            <p className="ticket-span">Description</p>
                            <p className={`desc ${showDescription ? 'full' : ''}`}>{description}</p>
                            {!description === '' && (
                                <span onClick={() => setShowDescription(!showDescription)} className="desc-esc">
                                    {showDescription ? <>Hide full description <RiArrowUpSLine size="20" /></> : <>Show full description<RiArrowDownSLine size="20" /></>}
                                </span>
                            )}
                        </div>
                        <div className="ticket-right">
                            <p>Messages</p>
                            <MessagePanel messages={messages} ticketId={ticketId} />
                        </div>
                    </main>
                )}
            </div>
        </div>
    )
}


export async function getStaticPaths() {
    const res = await axios.get('https://hook.integromat.com/3qd4mwsk7lqdmdbx92mvwwdn4sunpb4s')
    const paths = res.data.map(({ ticketId }) => ({ params: { ticketId: ticketId.toString() } }))

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params: { ticketId } }) {
    const res = await axios({
        method: 'get',
        url: 'https://hook.integromat.com/qsw1unfm28qdehuk3upc21otpjpsgtc8',
        data: {
            ticketId
        }
    })

    const { data, status } = res

    if (status === 400) {
        return {
            props: {}
        }
    }

    const messages = data.messages || []

    return {
        props: {
            ...data,
            messages
        }
    }
}
