# FabHub Deployment Guide

This guide covers deploying the FabHub B2B marketplace platform to various environments.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Docker Deployment](#docker-deployment)
- [Manual Deployment](#manual-deployment)
- [Cloud Deployment](#cloud-deployment)
- [SSL Configuration](#ssl-configuration)
- [Monitoring Setup](#monitoring-setup)
- [Troubleshooting](#troubleshooting)

## Prerequisites

- Node.js 18+
- Docker and Docker Compose
- Nginx (for manual deployment)
- SSL certificates
- Domain name
- Server with minimum 2GB RAM, 2 CPU cores

## Environment Setup

### 1. Environment Variables

Create environment-specific configuration files:

**Production Environment (`src/environments/environment.prod.ts`):**
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.fabhub.com/api',
  appName: 'FabHub',
  version: '1.0.0',
  enableLogging: false,
  enableAnalytics: true,
  // ... other configurations
};
```

### 2. Build Configuration

Update `angular.json` for production optimizations:

```json
{
  "configurations": {
    "production": {
      "optimization": true,
      "outputHashing": "all",
      "sourceMap": false,
      "namedChunks": false,
      "aot": true,
      "extractLicenses": true,
      "vendorChunk": false,
      "buildOptimizer": true
    }
  }
}
```

## Docker Deployment

### 1. Production Dockerfile

```dockerfile
# Multi-stage build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build:prod

FROM nginx:alpine AS production
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist/b2b-marketplace /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 2. Docker Compose for Production

```yaml
version: '3.8'
services:
  frontend:
    build: .
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./ssl:/etc/nginx/ssl
    environment:
      - NODE_ENV=production
    depends_on:
      - backend

  backend:
    image: fabhub/backend:latest
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:pass@postgres:5432/fabhub
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=fabhub
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

### 3. Deploy with Docker

```bash
# Build and start services
docker-compose up -d

# View logs
docker-compose logs -f

# Scale services
docker-compose up -d --scale frontend=3
```

## Manual Deployment

### 1. Build Application

```bash
# Install dependencies
npm ci

# Build for production
npm run build:prod

# The built files will be in dist/b2b-marketplace/
```

### 2. Nginx Configuration

Create `/etc/nginx/sites-available/fabhub`:

```nginx
server {
    listen 80;
    server_name fabhub.com www.fabhub.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name fabhub.com www.fabhub.com;

    # SSL Configuration
    ssl_certificate /etc/ssl/certs/fabhub.crt;
    ssl_certificate_key /etc/ssl/private/fabhub.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    ssl_prefer_server_ciphers off;

    # Security Headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Document Root
    root /var/www/fabhub;
    index index.html;

    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;

    # Static Assets Caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files $uri =404;
    }

    # Angular Routing
    location / {
        try_files $uri $uri/ /index.html;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    # API Proxy
    location /api/ {
        proxy_pass http://localhost:3000/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 3. Deploy Files

```bash
# Create directory
sudo mkdir -p /var/www/fabhub

# Copy built files
sudo cp -r dist/b2b-marketplace/* /var/www/fabhub/

# Set permissions
sudo chown -R www-data:www-data /var/www/fabhub
sudo chmod -R 755 /var/www/fabhub

# Enable site
sudo ln -s /etc/nginx/sites-available/fabhub /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## Cloud Deployment

### AWS Deployment

#### 1. EC2 Instance Setup

```bash
# Launch EC2 instance (t3.medium or larger)
# Install Docker
sudo yum update -y
sudo yum install -y docker
sudo systemctl start docker
sudo systemctl enable docker

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

#### 2. Application Load Balancer

```yaml
# Create ALB configuration
Resources:
  ApplicationLoadBalancer:
    Type: AWS::ElasticLoadBalancingV2::LoadBalancer
    Properties:
      Name: fabhub-alb
      Scheme: internet-facing
      Type: application
      Subnets:
        - !Ref PublicSubnet1
        - !Ref PublicSubnet2
      SecurityGroups:
        - !Ref ALBSecurityGroup
```

#### 3. Auto Scaling Group

```yaml
AutoScalingGroup:
  Type: AWS::AutoScaling::AutoScalingGroup
  Properties:
    MinSize: 2
    MaxSize: 10
    DesiredCapacity: 3
    LaunchTemplate:
      LaunchTemplateId: !Ref LaunchTemplate
      Version: !GetAtt LaunchTemplate.LatestVersionNumber
    TargetGroupARNs:
      - !Ref TargetGroup
```

### Google Cloud Platform

#### 1. Cloud Run Deployment

```yaml
# cloudbuild.yaml
steps:
  - name: 'gcr.io/cloud-builders/docker'
    args: ['build', '-t', 'gcr.io/$PROJECT_ID/fabhub', '.']
  - name: 'gcr.io/cloud-builders/docker'
    args: ['push', 'gcr.io/$PROJECT_ID/fabhub']
  - name: 'gcr.io/cloud-builders/gcloud'
    args: ['run', 'deploy', 'fabhub', '--image', 'gcr.io/$PROJECT_ID/fabhub', '--platform', 'managed', '--region', 'us-central1']
```

#### 2. Deploy to Cloud Run

```bash
# Build and deploy
gcloud builds submit --config cloudbuild.yaml

# Set environment variables
gcloud run services update fabhub --set-env-vars="NODE_ENV=production"
```

### Azure Deployment

#### 1. Container Instances

```yaml
# azure-deploy.yaml
apiVersion: 2021-07-01
location: eastus
name: fabhub-container
properties:
  containers:
  - name: fabhub
    properties:
      image: fabhub:latest
      resources:
        requests:
          cpu: 1
          memoryInGb: 2
      ports:
      - port: 80
        protocol: TCP
  osType: Linux
  ipAddress:
    type: Public
    ports:
    - protocol: TCP
      port: 80
```

## SSL Configuration

### 1. Let's Encrypt (Certbot)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d fabhub.com -d www.fabhub.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### 2. Custom SSL Certificate

```bash
# Copy certificates
sudo cp fabhub.crt /etc/ssl/certs/
sudo cp fabhub.key /etc/ssl/private/
sudo chmod 600 /etc/ssl/private/fabhub.key

# Update Nginx configuration
sudo nginx -t
sudo systemctl reload nginx
```

## Monitoring Setup

### 1. Application Monitoring

```yaml
# docker-compose.monitoring.yml
version: '3.8'
services:
  prometheus:
    image: prom/prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml

  grafana:
    image: grafana/grafana
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
    volumes:
      - grafana_data:/var/lib/grafana

  node-exporter:
    image: prom/node-exporter
    ports:
      - "9100:9100"
```

### 2. Log Management

```bash
# Install ELK Stack
docker-compose -f docker-compose.logging.yml up -d

# Configure log shipping
# Add to nginx.conf:
access_log syslog:server=localhost:514,facility=local7,tag=nginx,severity=info;
```

### 3. Health Checks

```bash
# Create health check script
#!/bin/bash
# health-check.sh
curl -f http://localhost/health || exit 1
curl -f http://localhost/api/health || exit 1
```

## Troubleshooting

### Common Issues

#### 1. Build Failures

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
npm run build:prod
```

#### 2. Nginx 502 Bad Gateway

```bash
# Check backend service
sudo systemctl status backend
sudo journalctl -u backend -f

# Check Nginx configuration
sudo nginx -t
sudo systemctl reload nginx
```

#### 3. SSL Certificate Issues

```bash
# Check certificate validity
openssl x509 -in /etc/ssl/certs/fabhub.crt -text -noout

# Test SSL configuration
ssl-test.com/fabhub.com
```

#### 4. Performance Issues

```bash
# Monitor resource usage
htop
docker stats

# Check application logs
docker-compose logs -f frontend
docker-compose logs -f backend
```

### Performance Optimization

#### 1. Enable Gzip Compression

```nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_comp_level 6;
gzip_types text/plain text/css application/json application/javascript;
```

#### 2. Browser Caching

```nginx
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

#### 3. CDN Configuration

```bash
# Configure CloudFlare or AWS CloudFront
# Update DNS to point to CDN
# Configure origin server
```

## Backup and Recovery

### 1. Database Backup

```bash
# PostgreSQL backup
pg_dump -h localhost -U user fabhub > backup_$(date +%Y%m%d).sql

# Automated backup script
#!/bin/bash
# backup.sh
pg_dump -h localhost -U user fabhub | gzip > /backups/fabhub_$(date +%Y%m%d_%H%M%S).sql.gz
```

### 2. Application Backup

```bash
# Backup application files
tar -czf fabhub_backup_$(date +%Y%m%d).tar.gz /var/www/fabhub/

# Backup configuration
tar -czf config_backup_$(date +%Y%m%d).tar.gz /etc/nginx/sites-available/fabhub
```

## Security Checklist

- [ ] SSL/TLS certificates installed and configured
- [ ] Security headers configured in Nginx
- [ ] Firewall rules configured
- [ ] Regular security updates scheduled
- [ ] Database access restricted
- [ ] API rate limiting enabled
- [ ] Monitoring and alerting configured
- [ ] Backup strategy implemented
- [ ] Access logs monitored
- [ ] DDoS protection configured

## Support

For deployment support:

- **Documentation**: https://docs.fabhub.com/deployment
- **Support Email**: deployment-support@fabhub.com
- **Emergency Contact**: +1-800-FABHUB-1