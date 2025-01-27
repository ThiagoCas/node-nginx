FROM node:16

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y wget 

ENV DOCKERIZE_VERSION v0.6.1

RUN apt-get update \
    && apt-get install -y wget \
    && wget -O - https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz | tar xzf - -C /usr/local/bin \
    && apt-get autoremove -yqq --purge wget && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /home/node.npm && chown -R node:node /home/node.npm

USER node

COPY . .

EXPOSE 3000

CMD ["dockerize", "-wait", "tcp://mysql:3306", "-timeout", "60m", "npm", "start"]