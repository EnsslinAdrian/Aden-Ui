# 1. Build-Stage
FROM node:22-alpine AS buildcontainer
WORKDIR /usr/src/app

# WICHTIG: Wir zwingen Angular dazu, nur EINEN Worker-Thread zu benutzen.
# Das verhindert, dass die 2 CPU-Kerne von GitHub Actions überlastet werden
# und der interne Timeout zuschlägt.
ENV NG_BUILD_MAX_PARALLEL_WORKERS=1
ENV NODE_OPTIONS="--max-old-space-size=4096"

ARG API_URL
ENV API_URL=${API_URL}

COPY . .
RUN npm install

# 1. API URL ersetzen
RUN sed -i "s|__API_URL__|${API_URL}|g" src/environments/environment*.ts

# 2. angular.json reparieren
# Wir setzen prerender auf true (als Boolean, wie vom Schema gefordert).
# Da "outputMode": "server" bereits drin ist, reicht das aus.
RUN sed -i 's/"outputMode": "server"/"outputMode": "server", "prerender": true/g' angular.json

# 3. Build ausführen
# Wir lassen Prerendering aktiv. Durch NG_BUILD_MAX_PARALLEL_WORKERS=1
# wird es jetzt stabil (wenn auch etwas langsamer) durchlaufen.
RUN npx ng build --configuration production

# 2. Runtime-Stage
FROM node:22-alpine
WORKDIR /usr/src/app
LABEL maintainer="Adrian Enßlin"

COPY --from=buildcontainer /usr/src/app/dist/aden_frontend_library /usr/src/app/dist/aden_frontend_library

EXPOSE 4000
CMD ["node", "dist/aden_frontend_library/server/server.mjs"]
