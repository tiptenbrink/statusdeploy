import React from 'react'
import Status from '~/components/status.tsx'

export default function StatusContent() {
    return (
        <div>
        <h2>Status</h2>
        <Status server="https://reminders.tipten.nl/alive" />
        <Status server="https://utilities.tipten.nl/alive" />
        <Status server="https://auth.tipten.nl/alive" />
        <Status server="https://www.tiptenbrink.nl/alive" />
        </div>
    )
}