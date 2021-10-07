import { useState, useEffect } from 'react'
import { encode as b64urlEncode } from 'base64url'

export default function getAlive(server: string): [boolean, string, boolean] {
    
    // useState is a React Hook, it basically initializes a dynamic variable (isAlive) and a function (setAlive) to change it
    const [isAlive, setAlive] = useState(false)
    const [aliveMessage, setAliveMessage] = useState("dead!")
    const [isSyncing, setIsSyncing] = useState(true)
    const encoder = new TextEncoder()
    const serverB64 = b64urlEncode(encoder.encode(server))
    
    
    // useEffect is a React Hook, it runs an effect and 'does something' with the stateful variables
    useEffect(() => {
        // It fetches the status API
        fetch('/api/status/' + serverB64).then(res => res.json().catch(() => ({})))
        .then(({ living, message }) => {
            if (typeof message === 'string' && typeof living === 'boolean') {
              setAlive(living)  
              setAliveMessage(message)
            }
        })
        .catch(e => console.error(e))
      .finally(() => {
        setIsSyncing(false)
      })
    }, []/* <-- This indicates the dependencies: when it updates. If it is empty, it only runs at initialization */)
    
    return [isAlive, aliveMessage, isSyncing]
}