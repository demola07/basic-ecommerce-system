# Base stage
FROM node:21-alpine AS base
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Development stage
FROM base AS dev
WORKDIR /usr/src/app
ENV NODE_ENV=development

# Expose the port the app runs on
EXPOSE 3000

# Run the application in development mode
CMD ["npm", "run", "start:dev"]

# Production stage
FROM base AS prod
WORKDIR /usr/src/app
ENV NODE_ENV=production

# Copy only the necessary files from the build stage
COPY --from=base /usr/src/app ./

# Build the app (example for a NestJS app)
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Run the application in production mode
CMD ["npm", "run", "start:prod"]
