FROM nginx:latest

COPY ./certificate.crt /etc/nginx/ssl/certificate.crt
COPY ./private_key.key /etc/nginx/ssl/private.key
COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080