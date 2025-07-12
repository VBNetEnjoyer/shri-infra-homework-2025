ARG NODE_VERSION=20.12.2-alpine

FROM node:${NODE_VERSION}

WORKDIR /node_app
COPY package.json package-lock.json* ./
RUN npm ci && npm cache clean --force

COPY . .

RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]