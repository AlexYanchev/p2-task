FROM node:18

COPY . /app

WORKDIR /app/backend

RUN npm install -g pnpm

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod 

RUN pnpm run build

EXPOSE 8000

CMD [ "pnpm", "run","start" ]