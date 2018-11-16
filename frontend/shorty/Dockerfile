# using nginx for servinf app
FROM nginx:alpine
# copy configurations
COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html
COPY dist/shorty/ .