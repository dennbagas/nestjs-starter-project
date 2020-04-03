# Create node image
FROM node:lts-alpine

# specifi the workdir
WORKDIR /app

# copy the files
COPY . /app

# install pm2
RUN npm install pm2 -g \
    # compile typescript
    && npm run build \
    && npm prune --production --silent \
    # Remove unused file/folder
    && rm -rf src \
    && rm tsconfig.json Dockerfile .dockerignore

# Expose port 3000
EXPOSE 3000

# run script.sh
CMD ["sh", "entrypoint.sh"]
