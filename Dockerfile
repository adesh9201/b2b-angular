# Stage 1: Build the Angular app
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies first (better caching)
COPY package*.json ./
RUN npm ci --no-audit --no-fund

# Copy source
COPY . .

# Build for production
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:stable-alpine

# Copy built assets
COPY --from=build /app/dist/b2b-marketplace/browser /usr/share/nginx/html

# Copy custom nginx config for Angular SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Non-root (optional)
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

