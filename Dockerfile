# Base Image
FROM node:10

# Create App Directory
RUN mkdir -p /var/lab-server

COPY . /var/lab-server

WORKDIR /var/lab-server
# Install Dependencies
RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start"]
