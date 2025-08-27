# FabHub - B2B Marketplace Platform

A comprehensive B2B marketplace platform built with Angular 20, featuring vendor management, product catalogs, and advanced e-commerce functionality.

## 🚀 Features

- **Modern Angular Architecture**: Built with Angular 20 standalone components
- **Vendor Dashboard**: Complete vendor management system
- **Product Catalog**: Advanced product browsing and search
- **Shopping Cart & Checkout**: Full e-commerce functionality
- **Responsive Design**: Mobile-first approach with Bootstrap 5
- **Performance Optimized**: Lazy loading, code splitting, and optimization
- **Security**: CSP headers, XSS protection, and secure authentication
- **Monitoring**: Performance tracking and error logging
- **Testing**: Comprehensive unit and e2e testing setup

## 🛠️ Tech Stack

- **Frontend**: Angular 20, TypeScript, Bootstrap 5, Angular Material
- **Build Tools**: Angular CLI, Webpack
- **Testing**: Jasmine, Karma, Cypress
- **Code Quality**: ESLint, Prettier, Husky
- **Deployment**: Docker, Nginx, CI/CD with GitHub Actions

## 📋 Prerequisites

- Node.js 18+ 
- npm 9+
- Docker (optional)
- Git

## 🚀 Quick Start

### Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd b2b-marketplace
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200/`

### Production Build

```bash
# Build for production
npm run build:prod

# Build for staging
npm run build:staging

# Analyze bundle size
npm run analyze
```

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run tests in CI mode
npm run test:ci

# Run tests with coverage
npm run test:coverage

# Run e2e tests
npm run e2e
```

## 🔧 Development Scripts

```bash
# Development
npm start                 # Start dev server
npm run start:staging     # Start with staging config
npm run start:prod        # Start with production config

# Building
npm run build             # Build for production
npm run build:staging     # Build for staging
npm run build:dev         # Build for development
npm run watch             # Build and watch for changes

# Code Quality
npm run lint              # Run ESLint
npm run precommit         # Run pre-commit checks

# Analysis
npm run analyze           # Analyze bundle size
```

## 🐳 Docker Deployment

### Development with Docker Compose

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production Docker Build

```bash
# Build production image
docker build -t fabhub:latest .

# Run container
docker run -p 80:80 fabhub:latest
```

## 🌍 Environment Configuration

The application supports multiple environments:

- **Development**: `src/environments/environment.ts`
- **Staging**: `src/environments/environment.staging.ts`
- **Production**: `src/environments/environment.prod.ts`

### Environment Variables

Configure the following in your environment files:

```typescript
export const environment = {
  production: boolean,
  apiUrl: string,
  appName: string,
  version: string,
  enableLogging: boolean,
  enableAnalytics: boolean,
  features: {
    enableVendorDashboard: boolean,
    enableAdvancedSearch: boolean,
    enableWishlist: boolean,
    enableReviews: boolean,
    enableChat: boolean
  },
  payment: {
    stripePublishableKey: string,
    paypalClientId: string
  },
  social: {
    facebookAppId: string,
    googleClientId: string
  },
  analytics: {
    googleAnalyticsId: string,
    hotjarId: string
  }
};
```

## 🏗️ Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── core/           # Core services, guards, models
│   │   ├── pages/          # Page components
│   │   ├── shared/         # Shared components
│   │   └── vendor/         # Vendor-specific components
│   ├── environments/       # Environment configurations
│   ├── app.config.ts       # App configuration
│   ├── app.routes.ts       # Routing configuration
│   └── app.ts             # Root component
├── assets/                # Static assets
└── styles.css            # Global styles
```

## 🔒 Security Features

- **Content Security Policy (CSP)**: Configured for XSS protection
- **Security Headers**: X-Frame-Options, X-Content-Type-Options, etc.
- **Input Sanitization**: XSS prevention utilities
- **HTTPS Enforcement**: Strict transport security
- **Error Handling**: Global error handler with logging

## 📊 Performance Features

- **Lazy Loading**: Route-based code splitting
- **Bundle Optimization**: Tree shaking and minification
- **Caching**: Static asset caching with Nginx
- **Compression**: Gzip compression enabled
- **Performance Monitoring**: Core Web Vitals tracking

## 🚀 Deployment

### Manual Deployment

1. **Build the application**
   ```bash
   npm run build:prod
   ```

2. **Deploy to web server**
   - Copy `dist/b2b-marketplace/` contents to web server
   - Configure Nginx (see `nginx.conf`)
   - Set up SSL certificates

### Automated Deployment

The project includes GitHub Actions CI/CD pipeline:

- **Pull Request**: Runs tests and linting
- **Main Branch**: Builds, tests, and deploys to production
- **Develop Branch**: Deploys to staging environment

## 📈 Monitoring & Analytics

- **Error Logging**: Global error handler with remote logging
- **Performance Metrics**: Core Web Vitals tracking
- **User Analytics**: Google Analytics integration
- **Health Checks**: Application health monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards

- Follow Angular style guide
- Use ESLint and Prettier for code formatting
- Write unit tests for new features
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Check the documentation
- Contact the development team

## 🔄 Version History

- **v1.0.0**: Initial production release
  - Complete B2B marketplace functionality
  - Vendor dashboard
  - Product catalog and search
  - Shopping cart and checkout
  - Security and performance optimizations