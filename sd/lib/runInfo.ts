import { useState, useEffect } from 'react'
import { RunInfo, WorkflowRuns } from '~/api/deploy/runs.ts'

export default function getRunInfo(): [RunInfo[], boolean] {
    
    const defaultRun: RunInfo = {
        id: 0,
        name: "...",
        status: "",
        conclusion: "",
        html_url: "https://github.com",
        head_sha: "",
        event: ""
    }
    
    // useState is a React Hook, it basically initializes a dynamic variable (isAlive) and a function (setAlive) to change it
    const [runInfo, setRunInfo] = useState([defaultRun])
    const [isSyncing, setIsSyncing] = useState(true)
    
    
    // useEffect is a React Hook, it runs an effect and 'does something' with the stateful variables
    useEffect(() => {
        // It fetches the status API
        fetch('/api/deploy/runs').then(res => res.json().catch(() => ({})))
        .then(({ runs }) => { 
            const runList = WorkflowRuns.parse(runs).workflow_runs
            setRunInfo(runList)
        })
        .catch(e => console.error(e))
      .finally(() => {
        setIsSyncing(false)
      })
    }, []/* <-- This indicates the dependencies: when it updates. If it is empty, it only runs at initialization */)
    
    return [runInfo, isSyncing]
}