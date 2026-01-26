# 1. Build-Stage
FROM node:22-alpine AS buildcontainer
WORKDIR /usr/src/app

# Wichtig für GitHub: Ein einzelner Worker verhindert CPU-Stau
ENV NG_BUILD_MAX_PARALLEL_WORKERS=1
ENV NODE_OPTIONS="--max-old-space-size=4096"

ARG API_URL
ENV API_URL=${API_URL}

COPY . .
RUN npm install

# 1. API URL ersetzen
RUN sed -i "s|__API_URL__|${API_URL}|g" src/environments/environment*.ts

# 2. DUMMY-BACKEND STARTEN & BUILD AUSFÜHREN
# Wir starten einen Mini-Server auf Port 8000 im Hintergrund (&),
# der auf JEDEN Request einfach mit einem leeren Array [] antwortet.
# Danach starten wir den Build. Sobald der Build fertig ist, wird der Container beendet.
RUN node -e "const http = require('http'); http.createServer((req, res) => { res.writeHead(200, {'Content-Type': 'application/json'}); res.end('[]'); }).listen(8000);" & \
    npx ng build --configuration production

# 3. Runtime-Stage
FROM node:22-alpine
WORKDIR /usr/src/app
LABEL maintainer="Adrian Enßlin"

# Kopiere den gesamten dist-Ordner
COPY --from=buildcontainer /usr/src/app/dist/aden_frontend_library /usr/src/app/dist/aden_frontend_library

EXPOSE 4000

# Startet den Server
CMD ["node", "dist/aden_frontend_library/server/server.mjs"]
