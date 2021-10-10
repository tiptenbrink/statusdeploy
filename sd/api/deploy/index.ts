import type { APIHandler } from 'aleph/types'
import { resolve } from 'path'


/** 
 * 
 */
export const handler: APIHandler = async ({ router, response }) => {
    const deploy_path = resolve(Deno.cwd() + "/../" + "tideploy")
    console.log(deploy_path)

    const cmd = Deno.run({
        cwd: deploy_path,
        cmd: ["poetry", "run", "tideploy", "--yaml", "deployment.yml"], 
        stdout: "piped",
        stderr: "piped"
      });
    const output = await cmd.output()
    const outStr = new TextDecoder().decode(output)
    

    const error = await cmd.stderrOutput()
    const errorStr = new TextDecoder().decode(error)

    cmd.close()

    response.status = 200
    response.json({ outStr, errorStr })
    console.log("Responding...")
    console.log(outStr)
    console.log(errorStr)
}