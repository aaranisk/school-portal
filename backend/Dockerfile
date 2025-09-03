FROM node:22-alpine

WORKDIR /app

# Create logs directory
RUN mkdir -p logs

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001
RUN chown -R nodejs:nodejs /app
USER nodejs

# Expose port
EXPOSE 3000

# Use nodemon in dev mode
CMD ["npm", "run", "dev"]
