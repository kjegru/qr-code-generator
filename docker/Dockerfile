# Stage 1: Build the application
FROM node:16-alpine AS build

# Set the working directory to app/
WORKDIR /app

# Copy package files from app/ directory
COPY app/package*.json ./

# Install dependencies
RUN npm ci --omit=dev

# Copy the rest of the application code
COPY app/ .

# Build the application
RUN npm run build

# Stage 2: Run the application
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy the built application from the build stage
COPY --from=build /app .

# Add a non-root user and switch to it
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
