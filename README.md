# statusdeploy

A server for monitoring and deploying your other servers. Runs on [Deno](https://deno.land), a modern runtime for JavaScript and TypeScript.

Currently very feature-poor.

### Setting up local development

This project uses Deno as its runtime. As such, set up Deno before developing.

The main entrypoint is `main.ts`, which should be run using the following command:

```shell
deno run --allow-net --allow-read=. --allow-write=. --unstable src/main.ts --dev
```

The `--dev` flag is used to allow for a local configuration specified in `resources/dev_config.yaml`. If removed, it will instead use `server_config.yaml`, which by default does not include any correct information.

The above run configuration gives the server network access as well as read and write permissions for its working directory. `--unstable` is enabled to allow for specifying the HTTP protocol. The project relies on HTTPS and you should use a tool such as [mkcert](https://github.com/FiloSottile/mkcert) for generating trusted SSL certificates for local development. 

#### Example mkcert installation

First, install the dependencies as listed on mkcert's Readme (for Ubuntu, `sudo apt install libnss3-tools`). Then use Homebrew to install mkcert: `brew install mkcert`. 

Now, navigate to your `<project directory>/resources` and run:

```shell
makecert localhost
```

This will generate a certificate file (`localhost.pem`) and a key file (`localhost-key.pem`). If you followed these exact steps, you are done, as the `dev_config.yaml` config file contains those two names by default and is read when the server starts. If you have your certificate and key files somewhere else, you need to change `dev_config.yaml` accordingly.

### Deployment

Run the following command from the project main directory. For `--allow-read`, be sure to include the directory for the certificate file. If you installed a certificate using certbot (Let's Encrypt), it is most likely as below (replace `<name>` with your certificate name).

```shell
deno run --allow-net --allow-read=.,/etc/letsencrypt/live/<name> --allow-write=. --unstable src/main.ts
```