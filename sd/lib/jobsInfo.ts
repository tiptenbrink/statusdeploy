import { useState, useEffect } from 'react'
import { JobInfo, RunJobs } from '~/api/deploy/[runJobs].ts'
import { z } from 'zod'

export type JobsMap = Map<number, JobInfo[] | null>
export type JobsHook = React.Dispatch<React.SetStateAction<JobsMap>>
export type AddRun = (run_id: number) => void
type AddRuns = (run_ids: number[]) => void
const defaultJobsMap: JobsMap = new Map<number, JobInfo[] | null>()


export default function getJobsInfo(): [JobsMap, AddRun, AddRuns, boolean] {
    
    const defaultJob: JobInfo = {
        id: 0,
        run_id: 0,
        name: "...",
        status: "",
        conclusion: "",
        html_url: "https://github.com"
    }

    // useState is a React Hook, it basically initializes a dynamic variable (isAlive) and a function (setAlive) to change it
    const [runJobs, setRunJobs] = useState(defaultJobsMap)
    const [syncedJobs, setSyncedJobs] = useState(false)
    
    const addRun = (run_id: number) => {
      const newRunJobs: JobsMap = new Map<number, JobInfo[] | null>() 
      runJobs.forEach((value, key) => newRunJobs.set(key, value))
      setRunJobs(newRunJobs.set(run_id, null))
    }

    const addAllRuns = (run_ids: number[]) => {
      const newRunJobs: JobsMap = new Map<number, JobInfo[] | null>() 
      Promise.all(run_ids.map(id =>
          fetch('/api/deploy/' + id.toString())
        )).then(responses =>
          Promise.all(responses.map( res => res.json().catch(() => ({})) ))
        ).then( runJobsList => { 
          const newRunJobs: JobsMap = new Map<number, JobInfo[] | null>() 
          runJobsList.forEach(runJobs => {
            try {
              const jobs = RunJobs.parse(runJobs.jobs).jobs
              const run_id = jobs[0].run_id
              newRunJobs.set(run_id, jobs)
            }
            catch (e) {
              newRunJobs.set(0, [defaultJob])
            }
            
          })
          setRunJobs(newRunJobs)
        })
      
      setSyncedJobs(true)
    }
    
    // useEffect is a React Hook, it runs an effect and 'does something' with the stateful variables
    useEffect(() => {
      runJobs.forEach((jobsCurrent, run_id) => {
        if (jobsCurrent == null) {
          fetch('/api/deploy/' + run_id.toString()).then(res => res.json().catch(() => ({})))
          .then(({ jobs }) => {
              if (jobs != undefined && jobs != null) {
                const jobsNew = RunJobs.parse(jobs).jobs
                const newRunJobs: JobsMap = new Map<number, JobInfo[] | null>() 
                runJobs.forEach((value, key) => newRunJobs.set(key, value))
                setRunJobs(newRunJobs.set(run_id, jobsNew))
              }
          })
          .catch(e => console.error(e))
        }
      })
      
    }, [runJobs]/* <-- This indicates the dependencies: when it updates. If it is empty, it only runs at initialization */)
    
    return [runJobs, addRun, addAllRuns, syncedJobs]
}