FROM denoland/deno:1.14.2

# The port that your application listens to.
EXPOSE 8080

RUN deno run -A https://deno.land/x/aleph@v0.3.0-beta.19/install.ts

ADD /sd ./opt/sd

WORKDIR /opt/sd

ENTRYPOINT ["./entrypoint.sh"]