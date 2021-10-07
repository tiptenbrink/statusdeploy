import type { APIHandler } from 'aleph/types'
import { decode as b64urlDecode } from 'base64url'

/** 
 * This handler wraps an external fetch. It is async because the fetch response is async, which is then resolved later/
 * This handler is accessed by fetching '/api/status/[server]' where '[server]' is the base64url-encoded string of the desired address/
 */
export const handler: APIHandler = async ({ router, response }) => {
    // Get the base64url-encoded string
    const serverB64 = router.params['server']
    
    const decoder = new TextDecoder("utf-8")
    let server
    try {
        server = decoder.decode(b64urlDecode(serverB64))
    }
    catch {
        server = "Decoding Error (" + serverB64 + ")"
    }
    console.log(server)
    
    // Here the actual fetch is performed to see if the remote server is alive/
    const res = await fetch(server).then(res => res.text()).catch(_res => "dead!")
    
    const living = res === "alive!"

    if (living) {
        const message = server + " is alive!"
        response.status = 200
        response.json({ living, message })
    }
    else {
        const message = server + " is dead!"
        response.status = 200
        response.json({ living, message })
    }
}