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

There are multiple ways to run Deno. An easy way to run it in the background is with Docker. Install docker and run the following command in the project directory:

```shell
docker build -t statusdeploy . && docker run -d -p 127.0.0.1:8080:8080 statusdeploy
```

Then run `docker container ls` to check if it is running. If it isn't, run `docker run -it 127.0.0.1:8080:8080 statusdeploy` to see what's going wrong. Be sure to configure server_config.yaml.

If successful, this builds an image called statusdeploy and then runs the container in the background, with the website accessible at localhost:8080.

Use a reverse proxy (e.g. using nginx) to create the web endpoint.