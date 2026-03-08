# Troubleshooting Log: Production Deployment Issues

During the deployment of the React dashboard to the AWS production server, we encountered a chain of bugs that prevented document uploads from appearing in the production database. 

Here is a simple but detailed breakdown of every issue we faced, why it happened, and how we solved it.

---

## 1. Frontend Sending Data to Localhost Instead of AWS
**One-liner solution:** Updated `docker-compose.yml` to build the frontend on the EC2 server instead of pulling a pre-built image, securely baking the AWS IP address into the React app.

**Detailed Explanation:**
- **The Problem:** The user interface would say "Upload Successful", but the file metadata never appeared in the AWS database. Surprisingly, no errors were thrown on the frontend.
- **The Root Cause:** In the original `docker-compose.yml`, the frontend service was instructed to download a pre-compiled image from GitHub (`ghcr.io/...`). Because Vite permanently "bakes" environment variables into static files at build time, the image downloaded had `VITE_API_URL=http://localhost:3000` baked inside it. When you used the live AWS site, your browser executed the React code and silently sent the document upload to your *own laptop's local development server*, completely bypassing AWS.
- **The Fix:** We rewrote the `frontend` block in `docker-compose.yml` to use `build: context: .` with a build argument passing the AWS IP (`http://13.63.65.240:3000`). This forced the AWS server to completely recompile the React code from scratch, seamlessly connecting the frontend to the production backend.

---

## 2. Docker Build Crash Due to Linux Case-Sensitivity 
**One-liner solution:** Fixed an import in `auditlogs.jsx` from `ErrorState.jsx` to `errorstate.jsx` because Linux file systems strictly enforce capitals, whereas Windows ignores them.

**Detailed Explanation:**
- **The Problem:** When we tried to rebuild the frontend using the new `docker-compose.yml` settings on the AWS server, the build instantly crashed with the error: `Could not resolve "../components/ui/ErrorState.jsx"`.
- **The Root Cause:** The physical file on the hard drive was named `errorstate.jsx` (all lowercase). On Windows laptops, the file system is case-insensitive, meaning it ignores the fact that the import used capital letters. However, Linux (the operating system running your AWS EC2 instance) is strictly case-sensitive. Since `ErrorState.jsx` did not perfectly match the lowercase file name, Linux threw a "File Not Found" error, breaking the Vite build.
- **The Fix:** We corrected the import statement in `src/Pages/auditlogs.jsx` to precisely match the lowercase file name (`import ErrorState from '../components/ui/errorstate.jsx';`). Then, we pushed this tiny fix to GitHub, pulled it to the AWS server, and the frontend successfully built.

---

## 3. "Failed to Fetch" Errors and Blank Database Passwords
**One-liner solution:** Created a permanent `.env` file directly on the EC2 server and securely populated it with the real database passwords, preventing the backend from crashing.

**Detailed Explanation:**
- **The Problem:** After successfully building the frontend, attempting to upload a document resulted in a red "failed to fetch data" network network error in the browser.
- **The Root Cause:** By diving into the backend server logs using `docker logs reactdash_backend`, we found a fatal crash loop: `SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a string`. The `docker-compose.yml` file is designed to read passwords from the host machine using variables like `${DB_PASSWORD}`. However, the AWS EC2 machine was entirely blank—it didn't know the password! Because the backend booted up with an empty password, it could not authenticate with the PostgreSQL database. Since the backend was permanently crashed, all API requests from the frontend simply "failed to fetch".
- **The Fix:** We used the Linux terminal to create a secure, hidden `.env` file directly on the AWS Server (`~/reactdashboard/.env`). Inside it, we defined the real `POSTGRES_PASSWORD`, `DB_PASSWORD`, and `JWT_SECRET`. Upon restarting Docker, it automatically loaded these variables into the containers, seamlessly connecting the backend to the live production database.

---

## 4. Case Status Not Syncing with Database
**One-liner solution:** Implemented the missing `PUT /api/v1/cases/:id` backend route, service, and controller to persist the frontend's status change requests to PostgreSQL.

**Detailed Explanation:**
- **The Problem:** When clicking the status buttons on the Activity Feed (e.g., moving a case from "Pending" to "In Progress"), the UI immediately updated, but refreshing the page revealed that the database never saved the updated status.
- **The Root Cause:** The frontend correctly sent a `PUT` network request with the new status data. However, the backend's `activity-feed-routes.js` lacked a route listener for `PUT` requests! Because the route didn't exist, Fastify returned a `404 Not Found` response. The frontend silently ignored this error and kept showing its "optimistic" UI update as if the database save had succeeded.
- **The Fix:** We authored the missing backend logic: an `updateAssignedCase` service function that locates and modifies the database row, an `updateAssignedCase` controller function to validate input, and finally wired it into `activity-feed-routes.js` with `fastify.put()`.
