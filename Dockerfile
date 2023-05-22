FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY . .

ENV NODE_ENV=production \
    UV_THREAD_POOL_SIZE=6 \
    NODE_OPTIONS= \
    HTTP_PORT=3030

EXPOSE 3030

CMD ["node", "--v8-pool-size=16", "--max_old_space_size=64", "./dist/app.js"]
