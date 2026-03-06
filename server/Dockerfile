# ─────────────────────────────────────────────────
#  Choose the base environment we use node js 20 version and alpine linus because it is lightweight
# ─────────────────────────────────────────────────
FROM node:20-alpine

# ─────────────────────────────────────────────────
# STAGE 2: after this line every line run inside this 
# ─────────────────────────────────────────────────
WORKDIR /usr/src/app

# ─────────────────────────────────────────────────
# STAGE 3: Copy package files first (for caching) so even if we made a small change in our code they dont need to reninstall
# ─────────────────────────────────────────────────
COPY package*.json ./

# ─────────────────────────────────────────────────
# STAGE 4: Install dependencies (production only) we dont need dev dependencies in production like nodemon and ESlinit
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
