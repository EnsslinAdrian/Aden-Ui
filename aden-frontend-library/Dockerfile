########################################
# 1️⃣ BUILD STAGE
########################################
FROM node:22-alpine AS buildcontainer

WORKDIR /usr/src/app

# Build-Time API (nur damit prerender / build nicht crasht)
ARG API_URL
ENV API_URL=${API_URL}

COPY . .

RUN npm install

# API_URL in environments ersetzen (Build-Time)
RUN sed -i "s|__API_URL__|${API_URL}|g" src/environments/environment*.ts

# Mock-Backend NUR für den Build
RUN node -e "\
const http = require('http'); \
http.createServer((req, res) => { \
  res.writeHead(200, { 'Content-Type': 'application/json' }); \
  res.end('[]'); \
}).listen(8002); \
" & npm run build


########################################
# 2️⃣ RUNTIME STAGE (ECHTES SSR)
########################################
FROM node:22-alpine

WORKDIR /app
ENV NODE_ENV=production

# Runtime API URL (ECHTES BACKEND)
# Wird von docker-compose gesetzt
ENV API_URL=""

# Angular SSR braucht BEIDES
COPY --from=buildcontainer /usr/src/app/dist/aden_frontend_library/browser ./browser
COPY --from=buildcontainer /usr/src/app/dist/aden_frontend_library/server ./server

# Optional: package.json nur falls SSR Server deps braucht
COPY package.json package-lock.json ./
RUN npm install --omit=dev

EXPOSE 4000

# 🚀 STARTET DEN ANGULAR SSR SERVER
CMD ["node", "server/server.mjs"]
