# ⚡ AWS Quick Reference

> **EC2 IP:** `13.63.65.240` | **User:** `ec2-user` | **Key:** `C:\Users\apoor\Downloads\apoorv.pem`

---

## 🔑 SSH Into EC2

```powershell
ssh -i "C:\Users\apoor\Downloads\apoorv.pem" ec2-user@13.63.65.240
```

---

## 🚀 CI/CD (Auto-Deploy)

Push to `main` branch → GitHub Actions auto-builds images → deploys to EC2.  
**You don't need to do anything manually.**

Monitor runs → https://github.com/apoorvs549-lang/Legal_Dash/actions

---

## 🐳 Container Commands (run on EC2 after SSH)

```bash
# Check all containers are running
docker ps

# View live logs
docker-compose logs -f

# Restart everything (uses pre-built images — no rebuild)
docker-compose down && docker-compose up -d

# Restart one service
docker-compose restart backend
docker-compose restart frontend
docker-compose restart db
```

---

## 🔴 Site Down? Do This

```bash
# SSH in, then:
cd ~/reactdashboard
docker-compose up -d        # starts containers using cached images (fast)
docker ps                   # verify all 3 are Up
```

> ⚠️ Never run `docker-compose up --build` on EC2 — it will crash (1GB RAM limit).

---

## 🌐 App URLs

| Service   | URL                                  |
|-----------|--------------------------------------|
| Frontend  | http://13.63.65.240                  |
| Backend   | http://13.63.65.240:3000             |
| Health    | http://13.63.65.240:3000/health      |

---

## ⏸️ Stop / Start EC2

### Stopping the instance
Go to **AWS Console → EC2 → Instances → Instance State → Stop**.  
Your files, Docker images, and database data are **all preserved**. Nothing is lost.

### Starting the instance again
Go to **AWS Console → EC2 → Instances → Instance State → Start**.  
Wait ~30 seconds for it to boot.

> ✅ Elastic IP is set — IP stays `13.63.65.240` after every restart. No need to update anything.

---

### ✅ Will it work automatically after a restart?

**Short answer: No — you need to start the containers manually.**

Docker containers do NOT auto-start when EC2 reboots (unless configured to). The EC2 machine boots fine, but the app is offline until you run one command.

---

### 🟢 Normal Case — Works First Try (follow these steps)

```powershell
# Step 1 — SSH in (run this on your local machine)
ssh -i "C:\Users\apoor\Downloads\apoorv.pem" ec2-user@13.63.65.240
```

```bash
# Step 2 — Start the containers (run these on EC2)
cd ~/reactdashboard
docker-compose up -d

# Step 3 — Verify all 3 are running
docker ps
```

Expected output:
```
NAMES                STATUS
reactdash_frontend   Up X seconds
reactdash_backend    Up X seconds
reactdash_db         Up X seconds (healthy)
```

Site should be live at **http://13.63.65.240** ✅

---

### 🔴 If It Doesn't Work — Troubleshoot In Order

**Problem 1 — SSH connection refused or times out**
> The instance hasn't fully booted yet.
```powershell
# Wait 60 seconds and try SSH again
ssh -i "C:\Users\apoor\Downloads\apoorv.pem" ec2-user@13.63.65.240
```
If still failing → check AWS Console that instance state shows **"Running"** (not "Pending").

---

**Problem 2 — `docker-compose up -d` gives an error about images not found**
> The pre-built images from ghcr.io need to be pulled again.
```bash
# Log into GitHub Container Registry first
echo "YOUR_GITHUB_PAT" | docker login ghcr.io -u apoorvs549-lang --password-stdin

# Then pull the images
docker pull ghcr.io/apoorvs549-lang/legal-dash-backend:latest
docker pull ghcr.io/apoorvs549-lang/legal-dash-frontend:latest

# Now start
docker-compose up -d
```
> Replace `YOUR_GITHUB_PAT` with your GitHub Personal Access Token.

---

**Problem 3 — Containers start but site still not loading**
> The DB might still be starting (it takes ~10s to become healthy).
```bash
# Wait 15 seconds, then check status
docker ps

# If backend shows "Restarting" — check its logs
docker logs reactdash_backend --tail 30

# Force a clean restart
docker-compose down && docker-compose up -d
```

---

**Problem 4 — Frontend loads but API calls fail (login broken etc.)**
> The backend crashed. Check logs:
```bash
docker logs reactdash_backend --tail 50
```
Common fix — restart just the backend:
```bash
docker-compose restart backend
```

---

**Problem 5 — Everything is running but site shows old content**
> Browser cache. Hard refresh:
```
Ctrl + Shift + R   (Windows)
Cmd  + Shift + R   (Mac)
```

---

## 🛠️ Debug Commands

```bash
# See last 50 lines of backend logs
docker logs reactdash_backend --tail 50

# See last 50 lines of frontend logs
docker logs reactdash_frontend --tail 50

# Check memory & disk
free -h
df -h

# Pull latest code manually (CI/CD does this automatically)
cd ~/reactdashboard && git pull origin main
```

---

## 🔐 GitHub Secrets (already set — for reference only)

| Secret | Value |
|--------|-------|
| `EC2_HOST` | `13.63.65.240` |
| `EC2_USER` | `ec2-user` |
| `EC2_SSH_KEY` | Contents of `apoorv.pem` |

Manage at → https://github.com/apoorvs549-lang/Legal_Dash/settings/secrets/actions
