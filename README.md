# statusdeploy

A server for monitoring and deploying your other servers. Runs on [Deno](https://deno.land), a modern runtime for JavaScript and TypeScript.

Currently very feature-poor.

### Setting up local development

This project uses Deno as its runtime. As such, set up Deno before developing.

The main entrypoint is `main.ts`, which should be run using the following command:

```shell
deno run --allow-net --allow-read=. --allow-write=. src/main.ts --dev
```

The `--dev` flag is used to allow for a local configuration specified in `resources/dev_config.yaml`. If removed, it will instead use `server_config.yaml`, which by default does not include any correct information.

The above run configuration gives the server network access as well as read and write permissions for its working directory. 

### Deployment

There are multiple ways to run Deno. An easy way is through [denon](https://deno.land/x/denon). 

First install it:

```shell
deno install -qAf --unstable https://deno.land/x/denon@2.4.9/denon.ts
```

A `scripts.json` file is provided already. So running `denon start` in the main project directory should do it.