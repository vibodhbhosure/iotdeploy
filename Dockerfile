FROM node:latest
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY /build ./
RUN npm run build
RUN npm install -g serve
CMD serve -s build