# 1. Build-Stage
FROM node:22-alpine AS buildcontainer
WORKDIR /usr/src/app

ARG API_URL
ENV API_URL=${API_URL}

COPY . .
RUN npm install

# 1. API URL ersetzen
RUN sed -i "s|__API_URL__|${API_URL}|g" src/environments/environment*.ts

# 2. Build ausführen
# Jetzt, wo "outputMode" weg ist, wird Angular NICHT mehr versuchen,
# die 53 Routen vorab zu rendern.
RUN npx ng build --configuration production

# 3. Runtime-Stage
FROM node:22-alpine
WORKDIR /usr/src/app
LABEL maintainer="Adrian Enßlin"

COPY --from=buildcontainer /usr/src/app/dist/aden_frontend_library /usr/src/app/dist/aden_frontend_library

EXPOSE 4000

# Startet den SSR Server
CMD ["node", "dist/aden_frontend_library/server/server.mjs"]
