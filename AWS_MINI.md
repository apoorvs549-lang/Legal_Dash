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

| Action | Where |
|--------|-------|
| Stop instance | AWS Console → EC2 → Instances → Instance State → **Stop** |
| Start instance | AWS Console → EC2 → Instances → Instance State → **Start** |
| After starting | SSH in → `cd ~/reactdashboard && docker-compose up -d` |

> ✅ Elastic IP is set — IP stays `13.63.65.240` even after restart.

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
