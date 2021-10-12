FROM denoland/deno:1.14.3

RUN deno run -A https://deno.land/x/aleph@v0.3.0-beta.19/install.ts

# The port that your application listens to.
EXPOSE 8080

ADD /sd ./sd

WORKDIR sd

ENTRYPOINT ["./entrypoint.sh"]