FROM node:18

WORKDIR /app

COPY . /app

RUN npm install -g pnpm

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

EXPOSE 8000

CMD [ "pnpm", "run","start" ]