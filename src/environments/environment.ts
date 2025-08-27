export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  appName: 'FabHub',
  version: '1.0.0',
  enableLogging: true,
  enableAnalytics: false,
  features: {
    enableVendorDashboard: true,
    enableAdvancedSearch: true,
    enableWishlist: true,
    enableReviews: true,
    enableChat: false
  },
  social: {
    facebook: 'https://facebook.com/fabhub',
    twitter: 'https://twitter.com/fabhub',
    linkedin: 'https://linkedin.com/company/fabhub',
    instagram: 'https://instagram.com/fabhub'
  },
  contact: {
    email: 'support@fabhub.com',
    phone: '+1-800-FABHUB',
    address: '123 Fabric Street, Textile City, TC 12345'
  }
};