FROM node:15

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY . .

RUN npm install
RUN npm run build

EXPOSE 4000

CMD [ "npm", "start" ]
