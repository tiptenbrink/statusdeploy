FROM denoland/deno:1.14.2

# The port that your application listens to.
EXPOSE 8080

WORKDIR /app

# Prefer not to run as root.
USER deno

# Cache the dependencies as a layer (the following two steps are re-run only when deps.ts is modified).
# Ideally cache deps.ts will download and compile _all_ external files used in main.ts.
COPY src/deps.ts ./src/deps.ts
RUN deno cache src/deps.ts

# Add resources and other source files
ADD resources ./resources
ADD src ./src
# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache src/main.ts

# Add the statically generated Aleph.js front-end HTML/JS
ADD sd/dist ./sd/dist

CMD ["run", "--allow-net", "--allow-read=.", "--allow-write=.", "src/main.ts"]