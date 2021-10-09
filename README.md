# statusdeploy

A web app for monitoring and deploying your other servers. Runs on [Aleph.js](https://alephjs.org/), a full stack [React](https://reactjs.org/) framework built on [Deno](https://deno.land), a modern runtime for JavaScript and TypeScript.

### Setting up local development

This project uses Deno as its runtime. As such, set up Deno before developing. You also need to install Aleph.js, which, after installing Deno, can be done by running:

```shell
deno run -A https://deno.land/x/aleph/install.ts
```

After this, enter the main `/sd` directory and simply run `aleph dev` to start in development mode or `aleph start` to start in production mode.

### Deployment

There are multiple ways to deploy an Aleph.js app. An easy way to run it in the background is with [Docker](https://docs.docker.com/). Install docker and run the following commands in the GitHub root directory (substitute 'tmtenbrink' with your own Docker hub repo):

```shell
docker build --tag tmtenbrink/statusdeploy .
```

You can then run it in the background using:

```shell
docker run -d -p 127.0.0.1:8080:8080 tmtenbrink/statusdeploy
```

Then run `docker container ls` to check if it is running. If it isn't, run `docker run -it -p 127.0.0.1:8080:8080 statusdeploy` to see what's going wrong.

If successful, the web app is accessible at localhost:8080.

Use a reverse proxy (e.g. using nginx) to create a web endpoint.

#### Using tiptenbrink/deploy

This project aims to automate deployment, so naturally the deployment of _this_ project can also be further automated. This is done using the [Python](https://www.python.org/) project in the `/deploy` subdirectory, which utilizes [Fabric](https://www.fabfile.org/) to remotely run commands via SSH. When the image is built, first push it to [Docker Hub](https://hub.docker.com/) using `docker push tmtenbrink/statusdeploy` (again, substitute the image repo with your own). 

Once it is available, take a look at `/deploy/deployment`. Modifying the `.env` provides a few basic configuration options (note that it must correspond to the actual build), but deployment can be further customized. The only requirement is a `deploy.sh` file.

Finally, deploying is now as easy as installing `docker compose` (V2) on your server of choice, configuring SSH keys (by default the script will look for a `ssh.key` in the `/deploy/keys` directory) and running `__main__.py` in the `/deploy` subdirectory using Python. It is a [Poetry](https://python-poetry.org/) project, so it is recommended to install the dependencies using Poetry. Run the script with the `--help` argument to find out the various arguments that can be provided.

An example when using Poetry (shows help):

```shell
poetry run python __main__.py -h
```

Using a config YAML:

```shell
poetry run python __main__.py --yaml deployments/deployment.yml
```
