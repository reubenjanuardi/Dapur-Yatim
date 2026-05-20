# Backend Dockerfile
# Multi-stage aware: production-optimized Node.js image

FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first (untuk cache layer)
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Create uploads directory
RUN mkdir -p uploads

# Set environment
ENV NODE_ENV=production

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD wget -qO- http://localhost:3001/api/v1/health || exit 1

# Start application
CMD ["node", "src/app.js"]
