import {arg_parse, yaml_parse, z, Application, send} from "./deps.ts";

const config_folder = "./resources";

// Parse arguments provided after the filename.
// Use --dev to specify using dev_config instead of server_config
const args = arg_parse(Deno.args);
let config_name;
let dev_mode = !!args.dev;
if (!dev_mode) {
    config_name = "server_config.yaml";
    console.log("Starting server in PRODUCTION mode... Ensure server_config.yaml is configured correctly!");
}
else {
    config_name = "dev_config.yaml";
    console.log("Starting server in DEVELOPMENT mode...")
}

// Use zod to create a schema for the config
const ServerConfig = z.object({
    port: z.number(),
});
type ServerConfig = z.infer<typeof ServerConfig>;

// Decode config information in yaml file
const decoder = new TextDecoder("utf-8");
const config_data = await Deno.readFile(config_folder + "/" + config_name);
const config = await yaml_parse(decoder.decode(config_data));

// Parse config according to schema
const server_config: ServerConfig = ServerConfig.parse(config);

const app = new Application();

app.use(async (context) => {
    await send(context, context.request.url.pathname, {
        root: `${Deno.cwd()}/sd`,
        index: "index.html",
    });
});

console.log(`Starting now at :${server_config.port}.`)
await app.listen({ port: server_config.port })
