# 🚀 CI/CD Pipeline Complete Guide

This document explains exactly how our Automated Deployments (CI/CD Pipeline) are set up. It is written step-by-step so that if you ever need to build a pipeline from scratch on a new project, you can understand exactly what each piece does.

---

## 🧐 What is CI/CD?
* **CI (Continuous Integration):** Automatically testing and building your code every time you push to GitHub to make sure it isn't broken.
* **CD (Continuous Deployment):** Automatically taking your newly built code and secretly sending it to your live AWS Server so your website updates instantly without you doing anything.

---

## 🛠️ The Core Problem We Solved
Originally, your EC2 server is a `t2.micro` which only has **1GB of RAM**. 
Running `docker-compose up --build` directly on your EC2 server caused the server to crash and freeze because building a massive Vite/React app takes too much memory.

**Our CI/CD Solution:**
Instead of making the weak EC2 server do the hard work, we hired GitHub's massive servers to do the building for us! 
1. **GitHub** builds the Docker images.
2. **GitHub** saves them in the cloud (GitHub Container Registry `ghcr.io`).
3. **AWS EC2** just downloads the pre-built images and runs them effortlessly.

---

## 📜 Breaking Down The File (`.github/workflows/deploy.yml`)

This file is what tells GitHub Actions what to do. You place it at the root of your project inside a folder path called `.github/workflows/`.

### 1. The Trigger
```yaml
name: 🚀 Build & Deploy to AWS EC2
on:
  push:
    branches: [main]
  workflow_dispatch:
```
* **What it does:** Tells GitHub "Whenever someone pushes code directly to the `main` branch, run this file automatically!" 
* **`workflow_dispatch`:** This adds a manual "Run Workflow" button to your GitHub Website so you can trigger this pipeline without even pushing code if you want.

### 2. Job 1: Building the Docker Images (The Heavy Lifting)
```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write   # needed to push to ghcr.io
```
* **What it does:** This spins up a temporary high-power Linux Server (owned by GitHub) to do our dirty work. It gives this server write-permissions to save our finished images.

```yaml
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
```
* **What it does:** The temporary GitHub server clones your repository so it has all your code exactly as it is locally.

```yaml
      - name: Log in to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
```
* **What it does:** Just like logging into your Gmail, this logs the terminal into `ghcr.io` (GitHub's private secure cloud storage for Docker images) so we actually have permission to upload our finished Docker templates. `GITHUB_TOKEN` is an internal password GitHub automatically provides for pipelines.

```yaml
      - name: Build & push Backend image
        uses: docker/build-push-action@v5
        with:
          context: ./server
          dockerfile: ./server/Dockerfile
          push: true
          tags: ${{ env.IMAGE_PREFIX }}-backend:latest
```
* **What it does:** We aim at the `server` folder and say "Build the Node.js Dockerfile!". Once the image is baked, `push: true` automatically uploads it perfectly into our private `ghcr.io` cloud.

```yaml
      - name: Build & push Frontend image
        uses: docker/build-push-action@v5
        with:
          context: .
          dockerfile: ./Dockerfile
          push: true
          tags: ${{ env.IMAGE_PREFIX }}-frontend:latest
          build-args: |
            VITE_API_URL=http://13.63.65.240:3000
```
* **What it does:** Does the exact same thing but for our Vite React App. We also explicitly inject the `VITE_API_URL` variable here so the React build knows exactly how to talk to the Node backend once it lives on AWS.

---

### 3. Job 2: Deploying to EC2
```yaml
  deploy:
    needs: build   
    runs-on: ubuntu-latest
```
* **`needs: build`**: This tells the pipeline: "Do not start deploying until Job 1 (Building) finishes successfully! If the build fails, cancel the deployment so the live website never crashes!"

```yaml
    steps:
      - name: SSH into EC2, pull images & restart
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ${{ secrets.EC2_USER }}
          key: ${{ secrets.EC2_SSH_KEY }}
```
* **What it does:** This is the magic bridge! It borrows an action created by `appleboy`. We feed it your Amazon AWS IP address, Username (`ec2-user`), and that secret `.pem` Key File you usually load into PuTTY. 
* **Where do these secrets live?** You created these in your GitHub project by going to **Settings -> Secrets and Variables -> Actions**. This hides your sensitive AWS keys from hackers who look at your code.

```yaml
          script: |
            echo "${{ secrets.GITHUB_TOKEN }}" | docker login ghcr.io -u ${{ github.actor }} --password-stdin
```
* **What it does:** The pipeline is successfully logged into your EC2 terminal! First, it logs EC2 into GitHub so your EC2 server has the security clearance to pull the fresh private images down from the cloud.

```yaml
            docker pull ghcr.io/apoorvs549-lang/legal-dash-backend:latest
            docker pull ghcr.io/apoorvs549-lang/legal-dash-frontend:latest
```
* **What it does:** EC2 downloads the finished, ultra-fast pre-built backend and frontend. Since it doesn't have to "build" them, your server's RAM never spikes above zero!

```yaml
            cd ~/reactdashboard
            git pull origin main
```
* **What it does:** Navigates into your project folder on AWS and pulls the latest raw files (like the `docker-compose.yml` file, which might have changed).

```yaml
            docker-compose down
            docker-compose up -d
```
* **What it does:** Takes down the old website. Spins up the exact new images we just downloaded instantly in the background. Because the images are fully pre-built via GitHub, this action takes 2 seconds and your live site is perfectly updated with zero downtime!

---

## 🛠️ Implementing it from Scratch
If you ever want to recreate this on a new AWS project:
1. Make a `.github/workflows/deploy.yml` file and copy this YAML code.
2. In your GitHub Repo, go to **Settings > Secrets**.
3. Add `EC2_HOST` (IP address, example: `13.63.65.240`).
4. Add `EC2_USER` (`ec2-user` for Amazon Linux).
5. Add `EC2_SSH_KEY` (Open your local downloaded `.pem` file physically in notepad, copy all the weird text, and paste it here).
6. Provide GitHub Container registry access. Go into Github repo **Settings -> Actions -> General -> Workflow Permissions -> Read and write permissions**.
7. Commit and `git push origin main`.
8. Let the pipeline work its magic!
