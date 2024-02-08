FROM node:20.9.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run compile

CMD ["node", "./dist/main.mjs"]

EXPOSE 3000