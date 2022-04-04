FROM nginx:1.21.4-alpine

COPY ./.docker/tls/ /etc/pki/tls/nginx/
COPY ./.docker/nginx/nginx.dev.conf /etc/nginx/conf.d/rooms.conf

EXPOSE 80
EXPOSE 443
