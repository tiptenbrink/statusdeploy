import React from 'react'
import Tabs, { TabStructure, Tab } from '~/components/tabs.tsx'
import Status from '~/components/status.tsx'
import Filler from '~/components/filler.tsx'

export default function SdTabs() {
    const status: Tab = {
        name: "Status",
        tab: (
        <div>
            <h2>Status</h2>
            <Status server="https://reminders.tipten.nl/alive" />
            <Status server="https://utilities.tipten.nl/alive" />
            <Status server="https://auth.tipten.nl/alive" />
            <Status server="https://www.tiptenbrink.nl/alive" />
        </div>
    )}

    const deploy: Tab = {
        name: "Deploy",
        tab: (
            <Filler />
        )
    }
    
    const tabStructure: TabStructure = {
        tabs: [status, deploy],
        defaultTab: 0
    }
    
    return (
        <Tabs tabStructure={tabStructure} />
    )
}