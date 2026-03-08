# ─────────────────────────────────────────────────
# STAGE 1: Build the React app
# ─────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first (Docker layer cache optimization)
COPY package*.json ./

# Install all dependencies (including devDependencies for the build)
RUN npm install

# Copy all source files
COPY . .

# Accept VITE_API_URL as a build argument
# (Vite bakes env vars into the JS bundle at build time)
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Raise the Node.js heap limit to 1.5 GB so Vite can build on low-RAM servers
# without hitting the default ~512 MB V8 heap cap and crashing mid-build.
ENV NODE_OPTIONS="--max-old-space-size=1536"

# Build the production React app
RUN npm run build

# ─────────────────────────────────────────────────
# STAGE 2: Serve with Nginx
# ─────────────────────────────────────────────────
FROM nginx:alpine

# Copy the built React files from Stage 1 into Nginx's serve folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy our custom Nginx config (handles React Router)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 (standard HTTP)
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
