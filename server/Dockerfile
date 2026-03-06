# ─────────────────────────────────────────────────
# STAGE 1: Choose the base environment
# ─────────────────────────────────────────────────
FROM node:20-alpine

# ─────────────────────────────────────────────────
# STAGE 2: Set the working directory inside container
# ─────────────────────────────────────────────────
WORKDIR /usr/src/app

# ─────────────────────────────────────────────────
# STAGE 3: Copy package files first (for caching)
# ─────────────────────────────────────────────────
COPY package*.json ./

# ─────────────────────────────────────────────────
# STAGE 4: Install dependencies (production only)
# ─────────────────────────────────────────────────
RUN npm install --omit=dev

# ─────────────────────────────────────────────────
# STAGE 5: Copy all remaining source code
# ─────────────────────────────────────────────────
COPY . .

# ─────────────────────────────────────────────────
# STAGE 6: Create the uploads folder inside container
# ─────────────────────────────────────────────────
RUN mkdir -p uploads

# ─────────────────────────────────────────────────
# STAGE 7: Expose the port your Fastify server runs on
# ─────────────────────────────────────────────────
EXPOSE 3000

# ─────────────────────────────────────────────────
# STAGE 8: Start the server
# ─────────────────────────────────────────────────
CMD ["node", "server.js"]
