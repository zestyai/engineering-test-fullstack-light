FROM node:slim

WORKDIR /var/app

COPY ./server /var/app

RUN npm install 

EXPOSE 3000

ENV NODE_ENV=production

CMD ["node", "./bin/www"]