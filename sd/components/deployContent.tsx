import React from 'react'
import Deployable from '~/components/deployable.tsx'

export default function DeployContent() {
    return (
        <div>
        <h2>Deploy</h2>
        <Deployable server="192.168.178.62"></Deployable>
        </div>
    )
}