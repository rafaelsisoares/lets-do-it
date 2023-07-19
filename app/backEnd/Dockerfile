FROM node:16.15-alpine
WORKDIR /app-back
COPY package* .
RUN npm install
COPY . .
EXPOSE 3001
CMD [ "npm", "run", "prestart" ]
ENTRYPOINT [ "npm", "start" ]