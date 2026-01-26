# 1. Build-Stage
FROM node:22-alpine AS buildcontainer
WORKDIR /usr/src/app

ARG API_URL
ENV API_URL=${API_URL}

COPY . .
RUN npm install

RUN sed -i "s|__API_URL__|${API_URL}|g" src/environments/environment*.ts

RUN npx ng build --configuration production


FROM node:22-alpine
WORKDIR /usr/src/app
LABEL maintainer="Adrian Enßlin"

COPY --from=buildcontainer /usr/src/app/dist/aden_frontend_library /usr/src/app/dist/aden_frontend_library

EXPOSE 4000

CMD ["node", "dist/aden_frontend_library/server/server.mjs"]
