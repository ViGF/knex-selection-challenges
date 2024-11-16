FROM node:16.13.0-slim

WORKDIR /home/node/app

RUN apt-get update -y && apt-get install -y openssl

USER node

COPY . .

EXPOSE 3000

CMD [".docker/start.sh"]