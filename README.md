# FabHub - B2B Marketplace Platform

A comprehensive, production-ready B2B marketplace platform built with Angular 20, featuring vendor management, product catalogs, and advanced e-commerce functionality.

## 🚀 Features

- **Modern Angular Architecture**: Built with Angular 20 using standalone components
- **Vendor Dashboard**: Complete vendor management system with analytics
- **Product Management**: Advanced product catalog with filtering and search
- **Shopping Cart & Checkout**: Full e-commerce functionality
- **Responsive Design**: Mobile-first design with Bootstrap 5
- **Performance Optimized**: Lazy loading, caching, and performance monitoring
- **Security**: CSP headers, XSS protection, and secure authentication
- **Testing**: Comprehensive unit, integration, and e2e testing
- **CI/CD**: Automated deployment pipeline with GitHub Actions
- **Monitoring**: Analytics, logging, and error tracking
- **Docker Support**: Containerized deployment with Docker

## 🛠️ Tech Stack

- **Frontend**: Angular 20, TypeScript, Bootstrap 5, Angular Material
- **Testing**: Jasmine, Karma, Cypress
- **Build Tools**: Angular CLI, Webpack
- **Code Quality**: ESLint, Prettier, Husky
- **Deployment**: Docker, Nginx, GitHub Actions
- **Monitoring**: Google Analytics, Custom logging

## 📋 Prerequisites

- Node.js 18.x or 20.x
- npm 9.x or higher
- Docker (optional, for containerized deployment)

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
   Navigate to `http://localhost:4200`

### Production Build

```bash
# Build for production
npm run build:prod

# Build for staging
npm run build:staging

# Build for development
npm run build:dev
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

## 🔧 Code Quality

```bash
# Run linting
npm run lint

# Format code
npm run format

# Analyze bundle size
npm run analyze
```

## 🐳 Docker Deployment

### Development
```bash
docker-compose --profile dev up
```

### Production
```bash
docker-compose up
```

### Build and run manually
```bash
# Build the image
docker build -t fabhub-app .

# Run the container
docker run -p 80:80 fabhub-app
```

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── core/           # Core services, guards, models
│   │   ├── pages/          # Page components
│   │   ├── shared/         # Shared components
│   │   └── vendor/         # Vendor-specific components
│   ├── environments/       # Environment configurations
│   └── assets/            # Static assets
├── styles.css             # Global styles
└── main.ts               # Application entry point
```

## 🔐 Environment Configuration

The application supports multiple environments:

- **Development**: `src/environments/environment.ts`
- **Staging**: `src/environments/environment.staging.ts`
- **Production**: `src/environments/environment.prod.ts`

## 🚀 Deployment

### GitHub Actions CI/CD

The project includes a comprehensive CI/CD pipeline:

1. **Code Quality**: Linting, testing, security scanning
2. **Build**: Multi-environment builds
3. **Deploy**: Automated deployment to staging and production

### Manual Deployment

1. **Build the application**
   ```bash
   npm run build:prod
   ```

2. **Deploy to your server**
   ```bash
   # Copy dist/ folder to your web server
   scp -r dist/ user@server:/var/www/html/
   ```

## 📊 Monitoring & Analytics

- **Error Tracking**: Global error handler with external logging
- **Performance Monitoring**: Core Web Vitals tracking
- **User Analytics**: Google Analytics integration
- **Logging**: Comprehensive logging service

## 🔒 Security Features

- **Content Security Policy**: Strict CSP headers
- **XSS Protection**: Input sanitization and validation
- **CSRF Protection**: Token-based CSRF protection
- **Secure Headers**: Security headers for all responses
- **Authentication**: JWT-based authentication with refresh tokens

## 🎯 Performance Optimizations

- **Lazy Loading**: Route-based code splitting
- **Caching**: HTTP and application-level caching
- **Bundle Optimization**: Tree shaking and minification
- **Image Optimization**: Responsive images and lazy loading
- **CDN Ready**: Static asset optimization

## 📚 API Documentation

The application includes comprehensive API documentation. See the `/docs` folder for detailed API specifications.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the established code style (ESLint + Prettier)
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- **Email**: support@fabhub.com
- **Documentation**: [Project Wiki](link-to-wiki)
- **Issues**: [GitHub Issues](link-to-issues)

## 🗺️ Roadmap

- [ ] Advanced search with Elasticsearch
- [ ] Real-time chat functionality
- [ ] Mobile app (React Native)
- [ ] AI-powered product recommendations
- [ ] Multi-language support
- [ ] Advanced analytics dashboard

## 🙏 Acknowledgments

- Angular team for the amazing framework
- Bootstrap team for the UI components
- All contributors and maintainers

---

**Built with ❤️ by the FabHub team**
