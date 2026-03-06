# 🐳 Docker Setup — Plain English Explanation

This project uses **two Docker files** to run the backend in containers on your machine.
Think of Docker as a way to package your app + everything it needs into a sealed box (called a **container**), so it runs the same way on any computer, every time.

---

## 📄 File 1: `server/Dockerfile`

This file tells Docker **how to build a single container** for your Fastify backend server.

```dockerfile
FROM node:20-alpine
```
**What it does:**
This is the starting point. You are telling Docker, "Start with an environment that already has Node.js version 20 installed."
- `node:20` means Node version 20.
- `alpine` means it's based on Alpine Linux, which is a very tiny and lightweight operating system (only ~5MB). This keeps your container small and fast.

---

```dockerfile
WORKDIR /usr/src/app
```
**What it does:**
This is like doing `cd /usr/src/app` inside the container. It sets the folder where all your code will live inside the container.
- If the folder doesn't exist, Docker creates it automatically.
- Every command that runs after this will run from inside this folder.

---

```dockerfile
COPY package*.json ./
```
**What it does:**
This copies your `package.json` (and `package-lock.json` if it exists) from your computer into the container's working directory.
- **Why copy these two files FIRST before anything else?** Because Docker is smart — it builds things in layers and saves (caches) each layer. If your code changes but your packages don't, Docker reuses the saved `npm install` layer and rebuilds much faster.

---

```dockerfile
RUN npm install --omit=dev
```
**What it does:**
This runs `npm install` to download all your backend's dependencies (Fastify, Sequelize, pg, etc.) inside the container.
- `--omit=dev` means skip the devDependencies (like `nodemon` and `sequelize-cli`). These are tools for local development — you don't need them in production, and leaving them out makes your container lighter and more secure.

---

```dockerfile
COPY . .
```
**What it does:**
Now it copies the rest of your entire backend source code (all your controllers, routes, models, services, `server.js`, etc.) into the container.
- **Why do this step AFTER `npm install`?** Because you change your source code far more often than you change your packages. By copying source code last, Docker's layer caching means you only re-run this step (and not the slow `npm install`) when your code changes.

---

```dockerfile
RUN mkdir -p uploads
```
**What it does:**
This creates the `uploads` folder inside the container so your app has a place to save uploaded documents.
- The `-p` flag means "create any parent directories too, and don't error if the folder already exists."

---

```dockerfile
EXPOSE 3000
```
**What it does:**
This is a label that tells Docker and anyone reading this file that your Fastify server listens on **port 3000** inside the container.
- This does NOT actually publish the port to the outside world. Think of it as documentation.
- The actual publishing to your computer happens in `docker-compose.yml` (explained below).

---

```dockerfile
CMD ["node", "server.js"]
```
**What it does:**
This is the **final command** that starts your server when the container powers on.
- Notice we use `node server.js` instead of `npm run dev` because you don't want `nodemon` restarting things inside a production container.
- The array format `["node", "server.js"]` is preferred because it runs the process directly without an extra shell wrapper, meaning graceful shutdown signals (like `Ctrl+C`) work correctly.

---
---

## 📄 File 2: `server/.dockerignore`

This works exactly like `.gitignore` does for Git, but for Docker.

It lists files and folders that Docker should **NOT** copy into the container when it runs the `COPY . .` command.

```
node_modules    # Already handled by npm install inside the container.
                # Copying from Windows would break native packages on Linux.

.env            # NEVER put secrets inside a Docker image!
                # Secrets are passed in via docker-compose.yml environment variables instead.

uploads         # We don't want to bake the local uploads folder into the image.
                # We use a "volume mount" in docker-compose.yml so the real folder on
                # your disk is linked directly to the container.

*.log           # Log files are noise and don't belong in the image.
```

---
---

## 📄 File 3: `docker-compose.yml` (in the project root folder)

This is the **master controller file**. It defines and connects **multiple containers** together so they can talk to each other. This project has two services: your database and your backend server.

```yaml
version: "3.9"
```
**What it does:** Tells Docker Compose which version of the compose file format to use. Version 3.9 is modern and widely supported.

---

### 🗄️ Service 1: `db` (Your PostgreSQL Database)

```yaml
db:
  image: postgres:16-alpine
```
**What it does:** Instead of building from a Dockerfile, this service uses the ready-made official PostgreSQL image from Docker Hub. Version 16 on Alpine Linux.
- You don't need PostgreSQL installed on your Windows machine for this to work. Docker handles it entirely.

---

```yaml
  container_name: reactdash_db
```
**What it does:** Gives the container a friendly, readable name. Instead of seeing a random hex string, you'll see `reactdash_db` in Docker Desktop.

---

```yaml
  restart: always
```
**What it does:** If the container crashes or your computer restarts, Docker will automatically start this container back up. This is essential for a database.

---

```yaml
  environment:
    POSTGRES_DB: database_dash
    POSTGRES_USER: postgres
    POSTGRES_PASSWORD: apoorv123
```
**What it does:** These are environment variables that the official PostgreSQL image reads on its very first startup to **automatically create** a database, user, and password for you. No manual setup needed!

---

```yaml
  ports:
    - "5433:5432"
```
**What it does:** Maps a port from your computer to a port inside the container.
- Format is always: `"YOUR_COMPUTER_PORT : CONTAINER_INTERNAL_PORT"`
- PostgreSQL always runs on port `5432` **inside** the container.
- We map it to `5433` on **your computer** (to match what was already in your `.env` file and to avoid conflicts if you already have a local Postgres on 5432).
- This means if you want to connect with a DB tool like DBeaver or TablePlus, you still connect to `localhost:5433`.

---

```yaml
  volumes:
    - pgdata:/var/lib/postgresql/data
```
**What it does:** This is crucial for data persistence! Without this, every time the container restarts, **all your database data would be wiped clean**.
- `pgdata` is a named Docker volume (defined at the bottom of the file). Docker manages this storage area on your computer.
- `/var/lib/postgresql/data` is where PostgreSQL stores all its data files inside the container.
- By linking them, your data is saved on your real machine and survives container restarts.

---

```yaml
  healthcheck:
    test: ["CMD-SHELL", "pg_isready -U postgres"]
    interval: 10s
    timeout: 5s
    retries: 5
```
**What it does:** This is a health check that regularly asks PostgreSQL, "Are you ready to accept connections?" 
- It checks every 10 seconds and tries up to 5 times.
- This is important because the `backend` service needs to wait until the database is actually ready before trying to connect. Without this, your backend would start instantly, try to connect to a database that hasn't fully booted yet, and crash.

---

### 🚀 Service 2: `backend` (Your Fastify Server)

```yaml
backend:
  build:
    context: ./server
    dockerfile: Dockerfile
```
**What it does:** Instead of using a pre-made image, this tells Docker to BUILD a custom image using your `Dockerfile`.
- `context: ./server` means "look inside the `server` folder for the files to copy."
- `dockerfile: Dockerfile` means "use the file named `Dockerfile` in that folder."

---

```yaml
  ports:
    - "3000:3000"
```
**What it does:** Maps port `3000` on your computer to port `3000` inside the container, so you can visit `http://localhost:3000` in your browser or Postman as normal.

---

```yaml
  environment:
    DB_HOST: db
    DB_PORT: 5432
    ...
```
**What it does:** These are the environment variables your `server.js` reads from `process.env.*`.
- 🔑 **The most important one is `DB_HOST: db`**. When containers are inside the same Docker Compose setup, they can find each other simply by using the **service name** as the hostname. So instead of `localhost`, your backend talks to the database container by calling it `db`.
- Notice `DB_PORT` is `5432` here (not `5433`!). This is the port **inside** the Docker network between containers. The `5433` mapping is only for connections coming from your Windows machine.

---

```yaml
  volumes:
    - ./server/uploads:/usr/src/app/uploads
```
**What it does:** This links the `uploads` folder on your real computer (`./server/uploads`) to the `uploads` folder inside the container (`/usr/src/app/uploads`).
- This means when a user uploads a document, the file is saved inside the container BUT also automatically appears in your real `server/uploads` folder on Windows. 
- If the container is deleted and recreated, the uploaded files are **not lost**.

---

```yaml
  depends_on:
    db:
      condition: service_healthy
```
**What it does:** This tells Docker Compose, "Do not start the `backend` container until the `db` container passes its health check." This prevents the common crash where the server tries to connect to a database that isn't ready yet.

---

### 💾 Volumes (at the bottom)

```yaml
volumes:
  pgdata:
```
**What it does:** This declares the named volume `pgdata` that was referenced in the `db` service. Docker creates and manages this storage area. All your database rows and tables are safely stored here and will persist even if you run `docker-compose down`.

---

## 🚀 How to Run Everything

Once you have Docker Desktop installed and running, open a terminal in the root of your project (`c:\Users\apoor\Desktop\reactdashboard`) and run:

```bash
# Build all images and start all containers
docker-compose up --build

# To stop everything
docker-compose down

# To stop AND delete the database data (full reset)
docker-compose down -v
```

Once running, your backend is live at: **http://localhost:3000**

---

## 🌍 Environment Variables: Localhost vs AWS Deployment

When moving between testing on your own computer (Localhost) and deploying to AWS EC2, you need to tell your apps where to find each other.

### 1. Local Development (Running on your PC)
When you run `npm run dev` locally, you want the React frontend to talk to your local backend server.

**In `.env` (Frontend):**
```env
VITE_API_URL=http://localhost:3000
```
*Why?* Because your local frontend needs to make fetch requests to `localhost:3000` where the local Fastify backend is running.

**In `docker-compose.yml` (Backend - if running backend in Docker locally):**
```yaml
      CORS_ORIGIN: http://localhost:5173
```
*Why?* The backend needs to allow requests coming from your Vite development server running on `localhost:5173`.

### 2. AWS EC2 Deployment (Running on the Cloud)
When deploying to AWS, `localhost` no longer works. The frontend runs in a user's browser, so it needs the public Internet IP of your EC2 instance to reach the backend.

**In `docker-compose.yml` (Backend & Frontend):**
```yaml
    environment:
      # ... other backend vars ...
      CORS_ORIGIN: http://YOUR_ELASTIC_IP

  frontend:
    build:
      args:
        VITE_API_URL: http://YOUR_ELASTIC_IP:3000
```
*(Replace `YOUR_ELASTIC_IP` with your actual IP, e.g., `13.49.72.10`)*

*Why?* 
1. The backend (`CORS_ORIGIN`) needs to allow requests from the public IP where the React app is hosted.
2. The frontend (`VITE_API_URL`) needs to know the public IP of the backend so the user's browser sends API requests to the EC2 server, not to their own computer (`localhost`).

**Important rule for the Frontend:** 
Vite bakes the `VITE_API_URL` into the Javascript files **at build time**. 
When deploying, instead of manually changing the `.env` file, we override it during the build command in PowerShell:
```powershell
$env:VITE_API_URL = "http://YOUR_ELASTIC_IP:3000"
npm run build
```
This keeps your `.env` file safely looking at `localhost` for your daily development work, while perfectly building the React code for AWS.

---

## 🚨 Troubleshooting: "Failed to Fetch" after an IP Change

If your EC2 instance is stopped and started without an **Elastic IP**, it gets a new public IP. If you update the code but still get a "Failed to Fetch" error or CORS warning in the browser console, you likely missed one of these two crucial updates:

### Problem 1: Frontend is calling the old IP
The frontend JS files still have the old IP baked into them.
**Fix:** 
1. Rebuild the frontend locally with the new IP: `$env:VITE_API_URL = "http://NEW_IP:3000" && npm run build`
2. Delete the old `dist` folder on EC2 (`rm -rf ~/reactdashboard/dist/*`)
3. Transfer the new `dist` folder to EC2.
4. Rebuild the frontend container: `docker-compose up --build frontend -d`

### Problem 2: Backend is blocking the new IP (CORS Error)
The backend container is still running with the old `CORS_ORIGIN` environment variable because the updated `docker-compose.yml` was never sent to EC2.
**Fix:**
1. Update `docker-compose.yml` locally with the new IP in `CORS_ORIGIN`.
2. Transfer the updated `docker-compose.yml` to EC2: `scp -i "key.pem" docker-compose.yml ec2-user@NEW_IP:~/reactdashboard/docker-compose.yml`
3. Rebuild the backend container on EC2: `docker-compose up --build backend -d`

**Ultimate Solution:** Always use an **Elastic IP** in AWS so your IP never changes, and you never have to deal with these two problems again!
