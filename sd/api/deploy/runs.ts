import { request } from 'octokitRequest'
import type { APIHandler } from 'aleph/types'

export const handler: APIHandler = async ({ router, response }) => {
    const result = await request('GET /repos/{owner}/{repo}/actions/runs', {
        owner: 'tmtenbrink',
        repo: 'rustfrc',
        per_page: 5
      })

      response.json({ result })
      response.status = 200

      console.log(result)
}