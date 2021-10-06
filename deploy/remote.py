from fabric import Connection
from pathlib import Path


def pull_run_remote():
    with Connection(
            host="sd.tipten.nl", user="transnode", port=21678,
            connect_kwargs={
                "key_filename": "./keys/ssh.key",
            },
    ) as c:
        dirpath = Path("deployment")

        for path in dirpath.rglob("*"):
            # because path is object not string
            path_str = str(path)
            print(path_str)
            c.put(path_str, remote="deployment")
        c.run("./deployment/deploy.sh")
