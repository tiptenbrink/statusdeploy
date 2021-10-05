import {argParse, yamlParse, z, Application, send} from "./deps.ts";

const configFolder = "./resources";

// Parse arguments provided after the filename.
// Use --dev to specify using dev_config instead of server_config
const args = argParse(Deno.args);
let configName;
const devMode = !!args.dev;
if (!devMode) {
    configName = "server_config.yaml";
    console.log("Starting server in PRODUCTION mode... Ensure server_config.yaml is configured correctly!");
}
else {
    configName = "dev_config.yaml";
    console.log("Starting server in DEVELOPMENT mode...")
}

// Use zod to create a schema for the config
const ServerConfig = z.object({
    port: z.number(),
});
type ServerConfig = z.infer<typeof ServerConfig>;

// Decode config information in yaml file
const decoder = new TextDecoder("utf-8");
const configData = await Deno.readFile(configFolder + "/" + configName);
const config = await yamlParse(decoder.decode(configData));

// Parse config according to schema
const serverConfig: ServerConfig = ServerConfig.parse(config);

const app = new Application();

app.use(async (context) => {
    await send(context, context.request.url.pathname, {
        root: `${Deno.cwd()}/sd`,
        index: "index.html",
    });
});

console.log(`Starting now at :${serverConfig.port}.`)
await app.listen({ port: serverConfig.port })
