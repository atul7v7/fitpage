FROM node:latest

# set the default working directory inside the container
WORKDIR /app

# Copy package.* .
COPY package.* /app/

RUN npm install

# absolute path
COPY . /app/

# its optional but good practice 
EXPOSE 3000

CMD ["npm", "run", "start:dev"]


