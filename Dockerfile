FROM node:latest
WORKDIR /app
COPY package*.json /app
RUN npm install
COPY . /app
ENV PORT=4000
ENV DATABASE=mongodb+srv://satyam:i2hu0ifELgPnOG67@cluster0.7xjgkfa.mongodb.net/?retryWrites=true&w=majority
ENV ACCESS_TOKEN_PRIVATE_KEY=c4c3635ad8caeacaca487eb83f413ee9332e7ef265f07078bbf0223273758575999ca8e5817c3dda75ae72ef39f4b14063fgbc69ed271fbd5aa489ae6abd7889
ENV REFRESH_TOKEN_PRIVATE_KEY=1sdd0ba9eb0aac19fb79ffd127da6da3d205cf61c2b78a4581e832809ca7e17a0070b3f0a0859e695064aa8af620389b475d7d36e8e6d92a547537e6a14590fb
ENV CLOUDINARY_CLOUD_NAME=dy49hsjsu
ENV CLOUDINARY_API_KEY=716526765926696
ENV CLOUDINARY_API_SECRET=c7UeqcS1zR5w1h6JBH4JTcdLECA
ENV CORS_ORIGIN=frontend.satyam-arya.click
ENV MAIL_HOST=smtp.gmail.com
ENV MAIL_USERNAME=satyam19arya@gmail.com
ENV MAIL_PASSWORD=bexdfyeymdtcnyvh
EXPOSE 4000
CMD ["node", "index.js"]