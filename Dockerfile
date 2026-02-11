# -------------------------------------------------
# 1. Build stage – install deps, compile assets
# -------------------------------------------------
FROM node:22-alpine AS builder

WORKDIR /tmp/app

# Install only production deps (add dev deps if you need a build step)
COPY package*.json ./
RUN npm i

# Copy the rest of the source code
COPY . .

# -------------------------------------------------
# 2. Runtime stage – smaller image for execution
# -------------------------------------------------
FROM node:22-alpine AS runners

COPY --from=builder /tmp/app/build ./build
COPY --from=builder /tmp/app/package*.json ./
COPY --from=builder /tmp/app/node_modules ./node_modules

ENV PORT=4800
ENV NODE_ENV=production

# Expose the port the app runs on
# The app runs on http://localhost:4800
EXPOSE 4800

# Server the app.
ENTRYPOINT ["npm", "start"]