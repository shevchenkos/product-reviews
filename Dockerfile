ARG NODE_VERSION=20.10.0
FROM node:${NODE_VERSION}-alpine AS base

FROM base AS development 
ARG APP 
ARG NODE_ENV=development 
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app 
COPY package.json ./ 
RUN npm install
COPY . . 
RUN npm run build ${APP} 

FROM base AS production 
ARG APP 
ARG NODE_ENV=production 
ENV NODE_ENV=${NODE_ENV} 
WORKDIR /usr/src/app 
COPY package.json ./ 
RUN npm install --omit=dev
COPY --from=development /usr/src/app/dist ./dist 
ENV APP_MAIN_FILE=dist/apps/${APP}/main 
CMD node ${APP_MAIN_FILE}
