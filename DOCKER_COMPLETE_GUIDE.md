# 🐳 The Complete Docker Guide for Our Project

This guide explains everything we have done in this project related to Docker. It details exactly how Docker helps our code, and breaks down every line of every Docker file we created.

---

## 🌟 How Docker Helps Our Code

In this project, we are dealing with a React frontend, a Fastify backend, and a PostgreSQL database. Managing these locally and keeping them running reliably in production (like AWS) is hard. Docker solves this by providing **Containers**.

Think of a container as a standardized, sealed box that contains your code *and* everything needed to run it (Node.js versions, dependencies, operating system, etc.).

**Here is exactly how Docker helps us:**
1. **"It works on my machine" is gone**: By using Docker, we dictate exact software versions (Node 20, Postgres 16) inside the file. It runs identically on Windows, Mac, Linux, or an AWS server. No more dependency errors because someone had the wrong Node version.
2. **Zero Setup Database**: You don't have to install PostgreSQL on your Windows machine or figure out how to reset a messy local database. Docker pulls a clean Postgres database, configures it with a password, and runs it instantly.
3. **Smooth AWS Deployment**: When deploying to AWS, we don't need to manually copy code, `npm install`, setup a database, and configure Nginx routing. We just upload `docker-compose.yml` and run `docker-compose up`, and everything boots up automatically on the server exactly like it does on localhost.
4. **Nginx Integration for React**: React routing (URLs without a `#`) requires specific server logic to work properly. Instead of dealing with messy Node.js fallback servers for our built React app, we use an Nginx container.

---

## 📄 1. The Frontend Dockerfile (`/Dockerfile`)

Located in the root project folder, this file generates the React Frontend image. It uses a concept called **Multi-Stage Builds**.

```dockerfile
# ─────────────────────────────────────────────────
# STAGE 1: Build the React app
# ─────────────────────────────────────────────────
FROM node:20-alpine AS builder
```
- **What it does**: This pulls a lightweight Node 20 environment and names this stage `builder`.

```dockerfile
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
```
- **What it does**: It sets the container's working directory to `/app`. By copying `package.json` first and running `npm install`, Docker uses caching—so if you just change a React component, it doesn't redownload all NPM packages. Then it copies the rest of your React code into the container.

```dockerfile
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build
```
- **What it does**: React (via Vite) bakes environment variables into the final JavaScript files *at build time*. The `ARG` allows us to pass variables into Docker during the build process. We set it as an `ENV` variable so Vite can read it, and then we run `npm run build` to generate the production `dist/` folder.

```dockerfile
# ─────────────────────────────────────────────────
# STAGE 2: Serve with Nginx
# ─────────────────────────────────────────────────
FROM nginx:alpine
```
- **What it does**: This starts Stage 2. It discards the heavy Node.js environment from Stage 1. It pulls a tiny Nginx web server image. Nginx is extremely fast at serving static HTML/JS files.

```dockerfile
COPY --from=builder /app/dist /usr/share/nginx/html
```
- **What it does**: It extracts *only* the compiled `/dist` folder from the `builder` stage and places it in Nginx's default public folder.

```dockerfile
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```
- **What it does**: It copies our custom `nginx.conf` over the default setup. It documents that this container runs on port `80`, and then it starts the Nginx server in the foreground so the container doesn't exit.

---

## 📄 2. Custom Nginx Configuration (`/nginx.conf`)

This file is necessary because React uses Client-Side Routing. When you refresh a page like `/dashboard`, your browser asks the server for `/dashboard/index.html`. Since that file doesn't exist (only the root `index.html` exists), an unconfigured server throws a 404 error. We use Docker to easily serve the app using Nginx.

```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    # Handle React Router — all routes fall back to index.html
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```
- **What it does**: 
  - `listen 80`: Starts HTTP server on port 80.
  - `root`: Tells Nginx where our React files live.
  - `try_files`: The magic trick. It tries to find the file the browser asked for (`$uri`). If not found, it tries to find a directory (`$uri/`). If both fail, it serves `/index.html`. Once `index.html` loads, React Router takes over and shows the correct component. 

---

## 📄 3. The Backend Dockerfile (`/server/Dockerfile`)

Located inside the `server` folder, this builds our Fastify Node.js API backend.

```dockerfile
FROM node:20-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --omit=dev
```
- **What it does**: It grabs Node 20. Sets the working directory. It copies the Node files and installs the packages.
- **`--omit=dev`**: This is a production best practice. We don't need `nodemon` inside the container. This makes the backend container much smaller and more secure.

```dockerfile
COPY . .
RUN mkdir -p uploads
```
- **What it does**: It copies the remaining backend code (routes, controllers). It forcefully creates an `uploads/` folder immediately so the backend doesn't crash when someone inevitably attempts a file upload and the container directory is missing.

```dockerfile
EXPOSE 3000
CMD ["node", "server.js"]
```
- **What it does**: Documents the port as 3000. It starts the server manually via `node server.js` instead of using `npm run dev`.

---

## 📄 4. The Master File (`/docker-compose.yml`)

The individual Dockerfiles only know how to build *single* containers. But our project needs three containers that easily talk to each other without conflict. `docker-compose.yml` ties them all together into a network.

```yaml
services:
  # SERVICE 1: PostgreSQL Database
  db:
    image: postgres:16-alpine
    container_name: reactdash_db
    restart: always
```
- **What it does**: Instantiates the database. We don't even use a Dockerfile here; it pulls the raw Postgres image straight from the internet.

```yaml
    environment:
      POSTGRES_DB: database_dash
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: apoorv123
    ports:
      - "5433:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
```
- **What it does**: The `environment` variables prompt the image to auto-initialize the database and admin user upon its very first run. No manual setup needed.
  - `ports`: Maps port 5433 on your local PC to port 5432 in the container.
  - `volumes`: Maps container data to a safe place on your hard drive. Without this volume mapping, if the database container accidentally shuts down, **all tables and user data would be permanently wiped.**

```yaml
  # SERVICE 2: Fastify Backend Server
  backend:
    build:
      context: ./server
      dockerfile: Dockerfile
```
- **What it does**: Tell Docker to look inside the `./server` folder and build the backend image using our Dockerfile.

```yaml
    environment:
      DB_HOST: db
      PORT: 3000
    depends_on:
      db:
        condition: service_healthy
```
- **What it does**: 
  - `DB_HOST: db`: This is the coolest part of Docker Compose. Instead of manually finding IP addresses between containers, we just give the host the name of the service: `db`. Docker magically auto-routes the traffic inside the network.
  - `depends_on`: Our server crashes if it boots before Postgres has finished loading up. This tells the backend container to wait until `db` confirms it is ready to accept connections before starting up.

```yaml
  # SERVICE 3: React Frontend (Nginx)
  frontend:
    build:
      context: .
      dockerfile: Dockerfile
      args:
        VITE_API_URL: http://13.63.65.240:3000
    ports:
      - "80:80"
```
- **What it does**: Looks closely at `context: .`. This tells Docker to process the root folder. It passes the `VITE_API_URL` to Vite via Docker arguments.
  - `ports`: Maps port 80 to port 80. Since port 80 is the default web port, a user can go to `http://13.63.65.240` in a browser and see the app without typing a port number!

---
## ✨ Summary
With this setup, our entire multi-tiered application is 100% reproducible anywhere.
By typing a single command—`docker-compose up --build`—the exact architecture works identically on our local computers or AWS Cloud in a matter of seconds.
