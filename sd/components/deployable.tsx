import React, { useState } from 'react'
import getRunInfo from '~/lib/runInfo.ts'
import getJobsInfo, { JobsMap, AddRun } from '~/lib/jobsInfo.ts'
import getBranchInfo from '~/lib/branchInfo.ts'

type DeployableProps = {
    server: string
}

// https://img.icons8.com/color/48/000000/menu--v1.png
const menu_svg = <svg viewBox="0 0 48 48" style={{ width: '1em', height: '1em' }}><path fill="#607D8B" d="M6 22H42V26H6zM6 10H42V14H6zM6 34H42V38H6z"></path></svg>

// https://img.icons8.com/color/48/000000/ok--v1.png
const success_svg = <svg viewBox="0 0 48 48" style={{ width: '1em', height: '1em' }}><path fill="#4caf50" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path fill="#ccff90" d="M34.602,14.602L21,28.199l-5.602-5.598l-2.797,2.797L21,33.801l16.398-16.402L34.602,14.602z"></path></svg>
const progress_svg = <svg viewBox="0 0 172 172" style={{ width: '1em', height: '1em' }}><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#f1c40f"><path d="M111.08333,25.0905l46.58333,6.0415l-38.356,36.95133zM60.91667,146.91667l-46.58333,-6.0415l38.356,-36.9585z"></path><path d="M28.66667,86c0,-31.66592 25.66742,-57.33333 57.33333,-57.33333c3.66933,0 7.24192,0.37983 10.72133,1.03917l2.48325,-13.84958c-4.15667,-1.12158 -8.68242,-1.505 -13.20458,-1.505c-39.60658,0 -71.66667,32.06008 -71.66667,71.66667c0,17.35767 6.0415,33.9485 17.35767,46.76608l10.88258,-9.42058c-8.64658,-10.0405 -13.90692,-23.07667 -13.90692,-37.36342zM141.44492,40.37342l-11.26242,9.09092c8.213,9.91867 13.15083,22.65025 13.15083,36.53567c0,31.66592 -25.66742,57.33333 -57.33333,57.33333c-3.68725,0 -7.28492,-0.37983 -10.77867,-1.04633l-2.42233,13.51275c4.52217,0.7525 9.04792,1.13592 13.201,1.13592c39.60658,0 71.66667,-32.06008 71.66667,-71.66667c0,-15.84192 -5.65808,-32.06367 -16.22175,-44.89558z"></path></g></g></svg>
const default_svg = <svg viewBox="0 0 48 48" style={{ width: '1em', height: '1em' }}><path fill="#00acc1" d="M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z"></path><path fill="#e0f7fa" d="M24 8A16 16 0 1 0 24 40A16 16 0 1 0 24 8Z"></path></svg>
const fail_svg = <svg viewBox="0 0 48 48" style={{ width: '1em', height: '1em' }}><path fill="#f44336" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path fill="#fff" d="M29.656,15.516l2.828,2.828l-14.14,14.14l-2.828-2.828L29.656,15.516z"></path><path fill="#fff" d="M32.484,29.656l-2.828,2.828l-14.14-14.14l2.828-2.828L32.484,29.656z"></path></svg>

export default function Deployable({ server }: DeployableProps) {
    const [runInfo, isSyncing] = getRunInfo()
    const [runJobs, addRun, addAllRuns, syncedJobs] = getJobsInfo()
    const [branchInfo] = getBranchInfo()

    const [activeRuns, setActiveRuns] = useState(new Set<number>())
    const [latestRun, setLatestRun] = useState(0)
    const changeActiveRuns = (newActiveRuns: Set<number>) => setActiveRuns(newActiveRuns)

    const runIDs: number[] = []

    if (!syncedJobs && !isSyncing) {
        const runIDs = runInfo.map(run => run.id)
        addAllRuns(runIDs)
        const latestRun = runIDs[0]
        if (latestRun != undefined) {
            toggleJobInfo(latestRun, activeRuns, changeActiveRuns)
            setLatestRun(latestRun)
        }
        
    }

    const latestRunString = "(Latest commit)"
    const notLatest = <span className="danger"><strong>(Not the latest commit!)</strong></span>

    // List of divs with information per workflow run
    const runInfod = runInfo.map(run => {
        const status_icon = getStatusIcon(run.status, run.conclusion)
        
        const jobs = runJobs.get(run.id)
        
        
        return (
            <div key={run.id}>
                {status_icon} <a href={run.html_url}>{run.name} ({run.event})</a> <button className="icon-container" onClick={() => toggleJobInfo(run.id, activeRuns, changeActiveRuns)}>{menu_svg}</button>
                {' '}
                {latestRun == run.id ? (branchInfo.commit.sha === run.head_sha ? latestRunString : notLatest) : ""}
                {(jobs == null || jobs == undefined || !activeRuns.has(run.id)) ? "" : <ul className="dashed">{jobs.map(job => { 
                        const job_status_icon = getStatusIcon(job.status, job.conclusion)
                        return <li key={job.id}>{job.name} {job_status_icon}</li> 
                    }
                )}</ul>}
            </div>
        )
    })

    const commit = <>Branch {branchInfo.name}: {branchInfo.commit.sha.slice(0,7)} - <i>{branchInfo.commit.commit.message}</i></>
    
    return (
        <div className="deployable">
            <p> 
                {server}
                {' '}
                <button onClick={deploy}>Deploy from Docker <i aria-hidden className="fab fa-docker"></i></button>
            </p>
            <p>{commit}</p>
            {isSyncing && (
                <em>...</em>
            )}
            {!isSyncing && 
            runInfod}

        </div>
    )
}

function getStatusIcon(status: string, conclusion: string | null) {
    let info = conclusion
    let status_icon = default_svg
    if (info === null) {
        info = status
        status_icon = progress_svg
    }
    else {
        if (info === "success") {
            status_icon = success_svg
        }
        else if (info === "failure") {
            status_icon = fail_svg
        }
    }
    
    return (<span title={info} className="icon-container">{status_icon}</span>)
}

function toggleJobInfo(run_id: number, activeRuns: Set<number>, changeActiveRuns: (s: Set<number>) => void) {
    const newActiveRuns = new Set<number>([...activeRuns])
    if (newActiveRuns.has(run_id)) {
        newActiveRuns.delete(run_id)
    } else {
        newActiveRuns.add(run_id)
    }
    changeActiveRuns(newActiveRuns)
}

function refreshJobInfo(run_id: number, runJobs: JobsMap, addRun: AddRun) {
    if (!runJobs.has(run_id)) {
        addRun(run_id)
    }
}

async function deploy() {
    await fetch("/api/deploy/")
}