FROM node:18 AS production

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN npm i

COPY . .

RUN npm run build

CMD ["sh", "-c", "npm run start:prod"]