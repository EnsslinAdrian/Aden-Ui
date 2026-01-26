# 1. Build-Stage
FROM node:22-alpine AS buildcontainer
WORKDIR /usr/src/app

# Wichtig für GitHub: Mehr RAM für Node bereitstellen
ENV NODE_OPTIONS="--max-old-space-size=4096"

ARG API_URL
ENV API_URL=${API_URL}

COPY . .
RUN npm install

# 1. API URL ersetzen
RUN sed -i "s|__API_URL__|${API_URL}|g" src/environments/environment*.ts

# 2. PRERENDERING AUSSCHALTEN (Der wichtigste Teil!)
# Wir suchen "outputMode": "server" und hängen "prerender": false direkt dran.
# Das verhindert, dass Angular beim Build versucht, die 53 Routen zu rendern.
RUN sed -i 's/"outputMode": "server"/"outputMode": "server", "prerender": false/g' angular.json

# 3. Build ausführen
# --max-parallel 1 sorgt dafür, dass der GitHub-Runner nicht überlastet wird.
RUN npx ng build --configuration production --max-parallel 1


# 2. Runtime-Stage
FROM node:22-alpine
WORKDIR /usr/src/app
LABEL maintainer="Adrian Enßlin"

# Kopiere den gesamten dist-Ordner (jetzt inklusive Manifest!)
COPY --from=buildcontainer /usr/src/app/dist/aden_frontend_library /usr/src/app/dist/aden_frontend_library

EXPOSE 4000

# Startet den Server
# (Da das Manifest jetzt vorhanden ist, startet der Server ohne Fehler)
CMD ["node", "dist/aden_frontend_library/server/server.mjs"]
