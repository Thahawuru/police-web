# Use the latest Node.js 20 base image for building the app
FROM node:20-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the frontend dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Use a lightweight web server to serve the app
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Expose the web server's port
EXPOSE 3000

# Start the web server
CMD ["nginx", "-g", "daemon off;"]
