FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM nginx:stable
#COPY --from=build /app/dist/my-app/ /usr/share/nginx/html
EXPOSE 80
