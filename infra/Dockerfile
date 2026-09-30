FROM node:22-bookworm-slim as builder
WORKDIR /jornadas
COPY . . 
COPY ./.env_front /jornadas/.env 
RUN yarn install
RUN yarn run build

FROM nginx:1.28.0 as production
ENV NODE_ENV production
COPY --from=builder /docs /var/www/html/jornadas
COPY ./infra/config/nginx_front.conf /etc/nginx/conf.d/default.conf

WORKDIR /var/www/html/jornadas
COPY ./.env_front .env


EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]