# statusdeploy

A server for monitoring and deploying your other servers. Runs on [Deno](https://deno.land), a modern runtime for JavaScript and TypeScript.

Currently very feature-poor.

### Setting up local development

This project uses Deno as its runtime. As such, set up Deno before developing.

Before the project can be run, the static site made using [Aleph.js](https://alephjs.org/) needs to be built. After installing Aleph.js, enter the `sd` directory and enter:

```shell
aleph build
```

This will generate the static site in `sd/dist`.

The main entrypoint is `main.ts`, which should be run using the following command:

```shell
deno run --allow-net --allow-read=. --allow-write=. src/main.ts --dev
```

The `--dev` flag is used to allow for a local configuration specified in `resources/dev_config.yaml`. If removed, it will instead use `server_config.yaml`, which by default does not include any correct information.

The above run configuration gives the server network access as well as read and write permissions for its working directory. 

### Deployment

There are multiple ways to run Deno. An easy way to run it in the background is with [Docker](https://docs.docker.com/). Install docker and run the following commands in the project directory (substitute 'tmtenbrink' with your own Docker hub repo):

```shell
docker build --tag tmtenbrink/statusdeploy .
```

You can then run it in the background using:

```shell
docker run -d 127.0.0.1:8080:8080 tmtenbrink/statusdeploy
```

Then run `docker container ls` to check if it is running. If it isn't, run `docker run -it 127.0.0.1:8080:8080 statusdeploy` to see what's going wrong. Be sure to configure `server_config.yaml`.

If successful, the website is accessible at localhost:8080.

Use a reverse proxy (e.g. using nginx) to create the web endpoint.

This project aims to automate deployment, so the deployment can be further automated using the [Python](https://www.python.org/) project in the `deploy` subdirectory, which utilizes [Fabric](https://www.fabfile.org/) to remotely run commands via SSH. When the image is built, first push it to Docker hub using `docker push tmtenbrink/statusdeploy` (again, substitute the image repo with your own). 

Once it is available, modify the `.env` file in `deploy/deployment`. Be sure the ports match the `server_config.yaml` that is incorporated in the build. 

Finally, deploying is now as easy as installing `docker compose` on your server of choice, configuring SSH keys (by default the script will look for a `ssh.key` in the `deploy/keys` directory) and running `main.py` in the `deploy` subdirectory using Python. It is a [Poetry](https://python-poetry.org/) project, so it is recommended to install the dependencies using Poetry.

Also ensure there is a `deployment` directory in the home directory of your server.

This scripts transfers the files inside `deploy/deployment` and then runs `deploy.sh`, which finally pulls the image and spins it up using docker compose. 