import { request } from 'octokitRequest'
import type { APIHandler } from 'aleph/types'
import { z } from 'zod'

const JobInfo = z.object({
  id: z.number(),
  run_id: z.number(),
  name: z.string(),
  conclusion: z.union([z.string(), z.null()]),
  status: z.string(),
  html_url: z.string()
})
export type JobInfo = z.infer<typeof JobInfo>

export const RunJobs = z.object({
  jobs: z.array(JobInfo)
})
export type RunJobs = z.infer<typeof RunJobs>

export const handler: APIHandler = async ({ router, response }) => {
  const run_id = router.params['runJobs']
  const result = await request('GET /repos/{owner}/{repo}/actions/runs/{run_id}/jobs', {
        owner: 'tiptenbrink',
        repo: 'tiauth',
        run_id
      })
      
  const jobs = RunJobs.parse(result.data)

  response.json({ jobs })
  response.status = 200
}