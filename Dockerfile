FROM denoland/deno:1.14.2

# The port that your application listens to.
EXPOSE 8080

RUN apt-get update

RUN apt-get install curl -y

ADD /sd .

ENTRYPOINT ["./entrypoint.sh"]