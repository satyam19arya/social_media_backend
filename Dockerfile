FROM node:latest
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
ENV PORT=$PORT
ENV DATABASE=$DATABASE
ENV ACCESS_TOKEN_PRIVATE_KEY=$ACCESS_TOKEN_PRIVATE_KEY
ENV REFRESH_TOKEN_PRIVATE_KEY=$REFRESH_TOKEN_PRIVATE_KEY
ENV CLOUDINARY_CLOUD_NAME=$CLOUDINARY_CLOUD_NAME
ENV CLOUDINARY_API_KEY=$CLOUDINARY_API_KEY
ENV CLOUDINARY_API_SECRET=$CLOUDINARY_API_SECRET
ENV CORS_ORIGIN=$CORS_ORIGIN
EXPOSE 4000
CMD ["node", "index.js"]