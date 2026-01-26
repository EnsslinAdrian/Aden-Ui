# 1. Build-Stage
FROM node:22-alpine AS buildcontainer
WORKDIR /usr/src/app

# Speicherlimit bleibt zur Sicherheit drin
ENV NODE_OPTIONS="--max-old-space-size=4096"

ARG API_URL
ENV API_URL=${API_URL}

COPY . .
RUN npm install

# 1. API URL ersetzen
RUN sed -i "s|__API_URL__|${API_URL}|g" src/environments/environment*.ts

# 2. PRERENDERING AUSSCHALTEN
# Wir fügen "prerender": false hinzu. Das verhindert die Timeouts.
RUN sed -i 's/"outputMode": "server"/"outputMode": "server", "prerender": false/g' angular.json

# 3. Build ausführen (Ohne das falsche Flag)
RUN npx ng build --configuration production

# 2. Runtime-Stage
FROM node:22-alpine
WORKDIR /usr/src/app
LABEL maintainer="Adrian Enßlin"

# Kopiere den gesamten dist-Ordner
COPY --from=buildcontainer /usr/src/app/dist/aden_frontend_library /usr/src/app/dist/aden_frontend_library

EXPOSE 4000

# Startet den Server
CMD ["node", "dist/aden_frontend_library/server/server.mjs"]
