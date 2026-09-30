FROM node:22-bookworm-slim AS builder
WORKDIR /jornadas
COPY . . 
COPY ./.env_front /jornadas/.env 
RUN yarn install
RUN yarn run build || true

FROM nginx:1.28.0 AS production
ENV NODE_ENV production
COPY --from=builder /jornadas/docs /var/www/html/jornadas
COPY ./infra/config/nginx_front.conf /etc/nginx/conf.d/default.conf

WORKDIR /var/www/html/jornadas
COPY ./.env_front .env


EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]