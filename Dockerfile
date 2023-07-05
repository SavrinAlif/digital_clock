# Use the LTS Alpine version of Node.js as the base image
FROM node:lts-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the necessary files to the container
COPY --chown=node:node index.html style.css script.js /app/
COPY --chown=node:node icons8-clock-120.png /app/
COPY --chown=node:node fonts /app/fonts

# Use a lightweight web server to serve the static files
FROM nginx:alpine

# Copy the static files from the build stage to the web server root
COPY --from=build --chown=nginx:nginx /app /usr/share/nginx/html

# Expose the default port
EXPOSE 80

# Start the nginx web server
CMD ["nginx", "-g", "daemon off;"]