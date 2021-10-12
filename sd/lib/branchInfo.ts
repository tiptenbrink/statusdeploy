import { useState, useEffect } from 'react'
import { BranchInfo } from '~/api/deploy/commit.ts'

export default function getRunInfo(): [BranchInfo] {
    
    const defaultBranch: BranchInfo = {
        name: "",
        commit: {
            commit: {
                message: ""
            },
            sha: ""
        }
    }
    
    // useState is a React Hook, it basically initializes a dynamic variable (isAlive) and a function (setAlive) to change it
    const [branchInfo, setBranchInfo] = useState(defaultBranch)
    
    // useEffect is a React Hook, it runs an effect and 'does something' with the stateful variables
    useEffect(() => {
        // It fetches the status API
        fetch('/api/deploy/commit').then(res => res.json().catch(() => ({})))
        .then(({ branch }) => { 
            const branchInfo = BranchInfo.parse(branch)
            setBranchInfo(branch)
        })
        .catch(e => console.error(e))
    }, []/* <-- This indicates the dependencies: when it updates. If it is empty, it only runs at initialization */)
    
    return [branchInfo]
}