# 1. Build-Stage
FROM node:22-alpine AS buildcontainer
WORKDIR /usr/src/app

ARG API_URL
ENV API_URL=${API_URL}

COPY . .
RUN npm install

# API_URL ersetzen
RUN sed -i "s|__API_URL__|${API_URL}|g" src/environments/environment*.ts

# ⬇️ MOCK-BACKEND NUR FÜR DEN BUILD
RUN node -e "\
const http=require('http');\
http.createServer((req,res)=>{\
  res.writeHead(200,{'Content-Type':'application/json'});\
  res.end('[]');\
}).listen(8002);\
" & npm run build

# Runtime-Image
FROM nginx:alpine
LABEL maintainer="Adrian Enßlin"

COPY nginx/default.conf /etc/nginx/conf.d
COPY --from=buildcontainer /usr/src/app/dist/aden_frontend_library /usr/share/nginx/html
