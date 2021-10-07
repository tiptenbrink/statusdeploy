import React from 'react'
import getAlive from '~/lib/alive.ts'

type StatusProps = {
    server: string
}

export default function Status({ server }: StatusProps) {
    const [isAlive, aliveMessage, isSyncing] = getAlive(server)
    
    return (
        <p> {isSyncing && (
                <em>...</em>
            )}
            {!isSyncing && isAlive && (
                <span>🟢 </span>
            )}
            {!isSyncing && !isAlive && (
                <span>🔴 </span>
            )}
            {!isSyncing && (
            <strong>{aliveMessage}</strong>
            )}
        </p>
          
    )
}