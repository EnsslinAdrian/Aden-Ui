# 1. Build-Stage
FROM node:22-alpine AS buildcontainer
WORKDIR /usr/src/app

ARG API_URL
ENV API_URL=${API_URL}

COPY . .
RUN npm install

# Wir ersetzen die API_URL
RUN sed -i "s|__API_URL__|${API_URL}|g" src/environments/environment*.ts

RUN npm run build

FROM nginx:alpine
LABEL maintainer="Adrian Enßlin"

COPY nginx/default.conf /etc/nginx/conf.d
COPY --from=buildcontainer /usr/src/app/dist/aden_frontend_library /usr/share/nginx/html

