import { request } from 'octokitRequest'
import type { APIHandler } from 'aleph/types'
import { z } from 'zod'

const WorkflowRun = z.object({
  name: z.string(),
  conclusion: z.union([z.string(), z.null()]),
  status: z.string(),
  html_url: z.string()
})
export type RunInfo = z.infer<typeof WorkflowRun>

export const WorkflowRuns = z.object({
  workflow_runs: z.array(WorkflowRun)
})
export type WorkflowRuns = z.infer<typeof WorkflowRuns>

export const handler: APIHandler = async ({ router, response }) => {
    const result = await request('GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/runs', {
        owner: 'tmtenbrink',
        repo: 'maturin-manylinux-wheels-action',
        workflow_id: 'test.yml',
        per_page: 15
      })
      
      const runs = WorkflowRuns.parse(result.data)


      response.json({ runs })
      response.status = 200

      console.log(runs)
}