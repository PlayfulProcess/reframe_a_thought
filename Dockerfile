# Use official Node.js 18 Alpine image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose port (default for Express)
EXPOSE 3000

# For local development, mount your .env file with Docker Compose or docker run -v
# The .env file is not copied into the image for security reasons

# Start the app
CMD ["npm", "start"] 