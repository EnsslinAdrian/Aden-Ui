# 1. Build-Stage
FROM node:22-alpine AS buildcontainer
WORKDIR /usr/src/app

ARG API_URL
ENV API_URL=${API_URL}

COPY . .
RUN npm install

# Wir ersetzen die API_URL
RUN sed -i "s|__API_URL__|${API_URL}|g" src/environments/environment*.ts

# WICHTIG: Wir deaktivieren Prerendering hier, damit der Build nicht
# versucht, auf das (noch nicht existierende) Backend zuzugreifen.
# SSR (Runtime) bleibt davon unberührt!
RUN npx ng build --prerender false

# 2. Runtime-Stage (Node.js statt nur Nginx für echtes SSR)
FROM node:22-alpine
WORKDIR /usr/src/app

LABEL maintainer="Adrian Enßlin"

# Kopiere die gebauten Dateien (Browser und Server)
COPY --from=buildcontainer /usr/src/app/dist/aden_frontend_library /usr/src/app/dist/aden_frontend_library

# Exponiere den Port, auf dem der Angular-SSR-Server standardmäßig läuft (meist 4000)
# Falls du Nginx davor behalten willst, siehe unten.
EXPOSE 4000

# Startet den Angular SSR Server
CMD ["node", "dist/aden_frontend_library/server/server.mjs"]
