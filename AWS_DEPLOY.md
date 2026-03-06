# AWS Deployment Guide — React Dashboard

> **EC2 IP (Elastic — Permanent):** `13.63.65.240`
> **PEM Key:** `C:\Users\apoor\Downloads\apoorv.pem`
> **Project Path on EC2:** `~/reactdashboard`

---

## 🚀 First-Time Setup (Already Done — Skip This)

<details>
<summary>Click to expand first-time setup steps</summary>

1. Launch EC2 instance (Amazon Linux 2023, t2.micro)
2. Set VPC route table: `0.0.0.0/0 → igw-xxx`
3. Open Security Group inbound ports: `22`, `80`, `3000`
4. SSH into EC2 and install Docker:
   ```bash
   sudo yum update -y && sudo yum install docker -y
   sudo service docker start
   sudo usermod -aG docker ec2-user
   # Log out and back in
   ```
5. Install Docker Compose:
   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```
6. Install Docker Buildx:
   ```bash
   mkdir -p ~/.docker/cli-plugins
   curl -SL https://github.com/docker/buildx/releases/download/v0.17.1/buildx-v0.17.1.linux-amd64 -o ~/.docker/cli-plugins/docker-buildx
   chmod +x ~/.docker/cli-plugins/docker-buildx
   ```
7. Add swap space (needed on 1GB RAM t2.micro):
   ```bash
   sudo dd if=/dev/zero of=/swapfile bs=128M count=16
   sudo chmod 600 /swapfile
   sudo mkswap /swapfile
   sudo swapon /swapfile
   echo '/swapfile swap swap defaults 0 0' | sudo tee -a /etc/fstab
   ```

</details>

---

## 🔁 Redeploying After Code Changes

Follow steps every time you update your code and want to redeploy.

---

### STEP 1 — SSH into EC2

Open a terminal (PowerShell or VS Code terminal) and run:

```powershell
ssh -i "C:\Users\apoor\Downloads\apoorv.pem" ec2-user@13.63.36.252
```

You should see: `[ec2-user@ip-172-31-27-194 ~]$`

---

### STEP 2 — Build the React Frontend Locally

> ⚠️ Always do this on your **local machine**, NOT on EC2 (EC2 runs out of memory).

Open a **new local PowerShell** and run:

```powershell
cd C:\Users\apoor\Desktop\reactdashboard
$env:VITE_API_URL = "http://13.63.36.252:3000"
npm run build
```

This creates/updates the `dist/` folder with your latest code.

---

### STEP 3 — Transfer the Fresh `dist` to EC2

Still in your **local PowerShell**, run:

```powershell
scp -i "C:\Users\apoor\Downloads\apoorv.pem" -r "C:\Users\apoor\Desktop\reactdashboard\dist\*" ec2-user@13.63.36.252:~/reactdashboard/dist/
```

> This only transfers compiled static files — fast (a few seconds).

---

### STEP 4 — (If backend changed) Transfer server files

Only needed if you changed backend code in the `server/` folder:

```powershell
# Zip the server folder (no node_modules)
Compress-Archive -Path "C:\Users\apoor\Desktop\reactdashboard\server\*" -DestinationPath "C:\Users\apoor\Desktop\server.zip" -Force

# Transfer the zip
scp -i "C:\Users\apoor\Downloads\apoorv.pem" "C:\Users\apoor\Desktop\server.zip" ec2-user@13.63.36.252:~/reactdashboard/server.zip
```

Then on **EC2 SSH terminal**:
```bash
cd ~/reactdashboard
rm -rf server/node_modules   # remove old node_modules first
unzip -o server.zip -d server/
rm server.zip
```

---

### STEP 5 — Restart Containers on EC2

In your **SSH terminal**:

```bash
cd ~/reactdashboard

# If only frontend changed:
docker-compose restart frontend
docker exec -u root reactdash_frontend chmod -R 755 /usr/share/nginx/html

# If backend changed (rebuilds the backend image):
docker-compose up --build -d

# Fix permissions after any rebuild:
docker exec -u root reactdash_frontend chmod -R 755 /usr/share/nginx/html
```

---

### STEP 6 — Verify Everything is Running

```bash
docker-compose ps
```

Expected output — all three should be `Up`:

| Container | Status |
|-----------|--------|
| reactdash_db | Up (healthy) |
| reactdash_backend | Up |
| reactdash_frontend | Up |

---

### STEP 7 — Open in Browser

Visit: **http://13.48.177.45**

Hard refresh with `Ctrl + Shift + R` to clear browser cache.

---

## 🛠️ Useful Troubleshooting Commands

```bash
# View logs from all containers
docker-compose logs -f

# View logs from just one container
docker logs reactdash_backend --tail 50
docker logs reactdash_frontend --tail 50

# Restart a single container
docker-compose restart backend
docker-compose restart frontend

# Full restart (stops and starts all containers)
docker-compose down && docker-compose up -d

# Full rebuild (use if you changed Dockerfiles)
docker-compose down && docker-compose up --build -d

# Check memory usage
free -h

# Check disk usage
df -h
```

---

## 🌐 App URLs

| Service | URL |
|---------|-----|
| Frontend (React) | http://13.63.36.252 |
| Backend API | http://13.63.36.252:3000 |
| Backend Health | http://13.63.36.252:3000/api/v1/health |

---

## ⚠️ Common Issues & Fixes

| Problem | Fix |
|---------|-----|
| Blank white screen | `docker exec -u root reactdash_frontend chmod -R 755 /usr/share/nginx/html` |
| Old code showing | Redo Steps 2–5 (rebuild + retransfer dist) |
| Backend not responding | `docker logs reactdash_backend --tail 50` to see errors |
| Out of memory during build | Never build on EC2 — always build locally (Step 2) |
| Can't connect to site | Check AWS Security Group has port 80 open |
| SSH not connecting | Check your IP is allowed in Security Group port 22 |

---

## 📌 Elastic IP Setup (Do This Once — Keeps Your IP Permanent)

> Without an Elastic IP, your EC2 public IP **changes every time you stop and start** the instance. Set this up once to fix your IP permanently.

### Step 1 — Allocate an Elastic IP
1. Go to **AWS Console → EC2 → Elastic IPs** (left sidebar under "Network & Security")
2. Click **"Allocate Elastic IP address"**
3. Leave all defaults → Click **"Allocate"**
4. You'll see a new IP (e.g. `13.48.177.45`) — this is now yours

### Step 2 — Associate it with your EC2 instance
1. Select the Elastic IP you just created
2. Click **"Actions" → "Associate Elastic IP address"**
3. Under **"Instance"**, select your EC2 instance
4. Click **"Associate"**

### Step 3 — Update your project with the new IP
If the Elastic IP is different from your current IP, update these two places locally:

**In `docker-compose.yml`** (lines 47 and 62):
```yaml
CORS_ORIGIN: http://YOUR_NEW_ELASTIC_IP         # line 47
VITE_API_URL: http://YOUR_NEW_ELASTIC_IP:3000   # line 62
```

Then **rebuild and redeploy** following Steps 2–5 in the Redeploying section above.

> ✅ After this, your IP never changes — even after stopping/starting the instance.
> ⚠️ Elastic IPs are **free** while associated with a running instance. If you delete the instance but keep the Elastic IP, AWS charges ~$0.005/hr.

---

## ⏸️ How to Stop & Start Your EC2 Instance

### To STOP (pause — files preserved, app goes offline):
1. Go to **AWS Console → EC2 → Instances**
2. Select your instance
3. Click **"Instance State" → "Stop instance"**
4. Confirm → instance stops in ~30 seconds
5. Your app will be offline, but **all files and Docker containers are preserved**

### To START again (resume):
1. Go to **AWS Console → EC2 → Instances**
2. Select your stopped instance
3. Click **"Instance State" → "Start instance"**
4. Wait ~30 seconds for it to boot
5. SSH in and start your containers:

```bash
ssh -i "C:\Users\apoor\Downloads\apoorv.pem" ec2-user@13.63.65.240
cd ~/reactdashboard
docker-compose up -d
```

> If you set up an Elastic IP (above), the IP stays the same and your app is immediately back at **http://13.63.36.252** after starting containers.
> If you did NOT set up an Elastic IP, go to EC2 → Instances → copy the new **Public IPv4 address** and use that instead.

### ❌ Never click "Terminate" — that permanently deletes everything!
