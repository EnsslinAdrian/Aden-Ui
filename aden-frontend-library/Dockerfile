# 1. Build-Stage
FROM node:22-alpine AS buildcontainer
WORKDIR /usr/src/app

# WICHTIG 1: Wir begrenzen die Anzahl der parallelen Worker auf 1.
# Das verhindert, dass die 2 CPU-Kerne auf GitHub Actions ersticken.
ENV NG_BUILD_MAX_PARALLEL_WORKERS=1
ENV NODE_OPTIONS="--max-old-space-size=4096"

ARG API_URL
ENV API_URL=${API_URL}

COPY . .
RUN npm install

# 1. API URL ersetzen (wie gehabt)
RUN sed -i "s|__API_URL__|${API_URL}|g" src/environments/environment*.ts

# WICHTIG 2: Wir erhöhen den internen Prerender-Timeout in der angular.json.
# Standardmäßig bricht Angular nach 30-60s ab. Wir geben ihm 5 Minuten (300.000ms),
# damit er auch auf den langsamen GitHub-Servern alle 53 Routen fertig rendern kann.
RUN sed -i 's/"outputMode": "server"/"outputMode": "server", "prerender": { "timeout": 300000 }/g' angular.json

# 3. Build ausführen
# Prerendering bleibt AN, SSR bleibt AN.
RUN npx ng build --configuration production

# 2. Runtime-Stage
FROM node:22-alpine
WORKDIR /usr/src/app
LABEL maintainer="Adrian Enßlin"

COPY --from=buildcontainer /usr/src/app/dist/aden_frontend_library /usr/src/app/dist/aden_frontend_library

EXPOSE 4000
CMD ["node", "dist/aden_frontend_library/server/server.mjs"]
