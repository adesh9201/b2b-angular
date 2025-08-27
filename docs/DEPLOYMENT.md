# FabHub Deployment Guide

## Overview

This guide covers deploying FabHub to various environments including development, staging, and production.

## Prerequisites

- Node.js 18.x or 20.x
- npm 9.x or higher
- Docker (for containerized deployment)
- Git
- Access to deployment servers

## Environment Setup

### 1. Development Environment

```bash
# Clone repository
git clone <repository-url>
cd b2b-marketplace

# Install dependencies
npm install

# Start development server
npm start
```

### 2. Staging Environment

```bash
# Build for staging
npm run build:staging

# Deploy to staging server
rsync -avz dist/ user@staging-server:/var/www/html/
```

### 3. Production Environment

```bash
# Build for production
npm run build:prod

# Deploy to production server
rsync -avz dist/ user@production-server:/var/www/html/
```

## Docker Deployment

### Development

```bash
# Build and run development container
docker-compose --profile dev up --build
```

### Production

```bash
# Build and run production container
docker-compose up --build
```

### Manual Docker Build

```bash
# Build production image
docker build -t fabhub-app:latest .

# Run container
docker run -d -p 80:80 --name fabhub-app fabhub-app:latest
```

## Nginx Configuration

### Basic Configuration

```nginx
server {
    listen 80;
    server_name fabhub.com;
    root /var/www/html;
    index index.html;

    # Handle Angular routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # API proxy
    location /api/ {
        proxy_pass https://api.fabhub.com/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### SSL Configuration

```nginx
server {
    listen 443 ssl http2;
    server_name fabhub.com;
    
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    ssl_prefer_server_ciphers off;
    
    # Security headers
    add_header Strict-Transport-Security "max-age=63072000" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    
    # Rest of configuration...
}
```

## CI/CD Pipeline

### GitHub Actions

The project includes automated CI/CD using GitHub Actions:

1. **Code Quality**: Linting, testing, security scanning
2. **Build**: Multi-environment builds
3. **Deploy**: Automated deployment to staging and production

### Manual Deployment Script

```bash
#!/bin/bash
# deploy.sh

set -e

ENVIRONMENT=$1
VERSION=$2

if [ -z "$ENVIRONMENT" ] || [ -z "$VERSION" ]; then
    echo "Usage: ./deploy.sh <environment> <version>"
    echo "Environments: staging, production"
    exit 1
fi

echo "Deploying version $VERSION to $ENVIRONMENT..."

# Build application
npm run build:$ENVIRONMENT

# Deploy to server
case $ENVIRONMENT in
    staging)
        rsync -avz --delete dist/ user@staging-server:/var/www/html/
        ;;
    production)
        rsync -avz --delete dist/ user@production-server:/var/www/html/
        ;;
    *)
        echo "Invalid environment: $ENVIRONMENT"
        exit 1
        ;;
esac

echo "Deployment completed successfully!"
```

## Environment Variables

### Development

```bash
# .env.development
NODE_ENV=development
API_URL=http://localhost:3000/api
ENABLE_LOGGING=true
ENABLE_ANALYTICS=false
```

### Staging

```bash
# .env.staging
NODE_ENV=staging
API_URL=https://staging-api.fabhub.com/api
ENABLE_LOGGING=true
ENABLE_ANALYTICS=false
```

### Production

```bash
# .env.production
NODE_ENV=production
API_URL=https://api.fabhub.com/api
ENABLE_LOGGING=false
ENABLE_ANALYTICS=true
```

## Monitoring and Logging

### Application Monitoring

- **Error Tracking**: Sentry integration
- **Performance Monitoring**: Google Analytics
- **Uptime Monitoring**: Pingdom or similar
- **Log Aggregation**: ELK Stack or similar

### Health Checks

```bash
# Health check endpoint
curl -f http://fabhub.com/health || exit 1
```

### Log Monitoring

```bash
# View application logs
docker logs fabhub-app

# View nginx logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

## Backup and Recovery

### Database Backup

```bash
# Backup database
pg_dump fabhub_db > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore database
psql fabhub_db < backup_20240101_120000.sql
```

### File Backup

```bash
# Backup uploaded files
tar -czf files_backup_$(date +%Y%m%d_%H%M%S).tar.gz /var/www/html/uploads/
```

## Security Considerations

### SSL/TLS

- Use Let's Encrypt for free SSL certificates
- Enable HSTS headers
- Use strong cipher suites

### Firewall

```bash
# Allow only necessary ports
ufw allow 22    # SSH
ufw allow 80    # HTTP
ufw allow 443   # HTTPS
ufw enable
```

### Updates

```bash
# Update system packages
apt update && apt upgrade -y

# Update Node.js dependencies
npm audit fix

# Update Docker images
docker pull fabhub-app:latest
```

## Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Clear npm cache
   npm cache clean --force
   
   # Delete node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Docker Issues**
   ```bash
   # Clean up Docker
   docker system prune -a
   
   # Rebuild without cache
   docker build --no-cache -t fabhub-app .
   ```

3. **Nginx Issues**
   ```bash
   # Test nginx configuration
   nginx -t
   
   # Reload nginx
   systemctl reload nginx
   ```

### Performance Issues

1. **Enable Gzip Compression**
2. **Optimize Images**
3. **Use CDN for Static Assets**
4. **Enable Browser Caching**

## Rollback Procedures

### Application Rollback

```bash
# Rollback to previous version
git checkout <previous-commit-hash>
npm run build:prod
rsync -avz dist/ user@production-server:/var/www/html/
```

### Database Rollback

```bash
# Restore from backup
psql fabhub_db < backup_previous.sql
```

## Support

For deployment support:
- **Email**: devops@fabhub.com
- **Documentation**: https://docs.fabhub.com
- **Issues**: [GitHub Issues](link-to-issues)