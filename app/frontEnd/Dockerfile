FROM node:16.15-alpine
WORKDIR /app-front
COPY package* .
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "run", "dev" ]