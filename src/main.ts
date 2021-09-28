import {arg_parse, yaml_parse, z} from "./deps.ts";

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
    certFile: z.string(),
    keyFile: z.string(),
    hostname: z.string(),
    port: z.number(),
});
type ServerConfig = z.infer<typeof ServerConfig>;

// Decode config information in yaml file
const decoder = new TextDecoder("utf-8");
const config_data = await Deno.readFile(config_folder + "/" + config_name);
const config = await yaml_parse(decoder.decode(config_data));

// Parse config according to schema
const server_config: ServerConfig = ServerConfig.parse(config);

// Set up listener for secure connection
const server = Deno.listenTls({
    port: server_config.port,
    hostname: server_config.hostname,
    certFile: (dev_mode ? config_folder + "/" : "") + server_config.certFile,
    keyFile: (dev_mode ? config_folder + "/" : "") + server_config.keyFile,
    alpnProtocols: ["h2", "http/1.1"],
});
console.log(`Running server at ${server_config.hostname}:${server_config.port}`)

for await (const conn: Deno.Conn of server) {
    try {
        handleConn(conn);
    }
    catch (err) {
        console.log(err)
    }
}

async function handleConn(conn: Deno.Conn) {
    const httpConn: Deno.HttpConn = Deno.serveHttp(conn);
    for await (const {request, respondWith} of httpConn) {
        const body = new TextEncoder().encode("Hello World");
        respondWith(new Response(body));
    }
}