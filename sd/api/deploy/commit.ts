import { request } from 'octokitRequest'
import type { APIHandler } from 'aleph/types'
import { z } from 'zod'

const InnerCommit = z.object({
    message: z.string(),
})

const Commit = z.object({
    commit: InnerCommit,
    sha: z.string()
})
export const BranchInfo = z.object({
    commit: Commit,
    name: z.string()
})
export type BranchInfo = z.infer<typeof BranchInfo>

export const handler: APIHandler = async ({ router, response }) => {
    const result = await request('GET /repos/{owner}/{repo}/branches/{branch}', {
        owner: 'tiptenbrink',
        repo: 'tiauth',
        branch: 'main',
      })
      
      const branch = BranchInfo.parse(result.data)

      response.json({ branch })
      response.status = 200
}