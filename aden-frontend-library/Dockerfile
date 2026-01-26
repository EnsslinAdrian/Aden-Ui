# 1. Build-Stage
FROM node:22-alpine AS buildcontainer
WORKDIR /usr/src/app

ARG API_URL
ENV API_URL=${API_URL}

COPY . .
RUN npm install

# 1. API URL in allen Umgebungsdateien ersetzen
RUN sed -i "s|__API_URL__|${API_URL}|g" src/environments/environment*.ts

# 2. Prerendering deaktivieren (WICHTIG!)
# Da "prerender" nicht in deiner angular.json steht, fügen wir es nach "outputMode" ein.
RUN sed -i 's/"outputMode": "server"/"outputMode": "server", "prerender": false/g' angular.json

# 3. Build ausführen
# Durch "prerender": false wird Angular jetzt NUR die Browser- und Server-Bundles bauen,
# aber KEINE HTTP-Requests an dein Backend senden.
RUN npx ng build --configuration production

# 2. Runtime-Stage (SSR-Umgebung)
FROM node:22-alpine
WORKDIR /usr/src/app
LABEL maintainer="Adrian Enßlin"

# Kopiere den gesamten dist-Ordner (enthält 'browser' und 'server')
COPY --from=buildcontainer /usr/src/app/dist/aden_frontend_library /usr/src/app/dist/aden_frontend_library

# Der SSR Server läuft standardmäßig auf Port 4000
EXPOSE 4000

# Startet den Angular SSR Server
CMD ["node", "dist/aden_frontend_library/server/server.mjs"]
