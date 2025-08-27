export const environment = {
  production: false,
  apiUrl: 'https://staging-api.fabhub.com/api',
  appName: 'FabHub - Staging',
  version: '1.0.0-staging',
  enableLogging: true,
  enableAnalytics: false,
  features: {
    enableVendorDashboard: true,
    enableAdvancedSearch: true,
    enableWishlist: true,
    enableReviews: true,
    enableChat: false
  },
  payment: {
    stripePublishableKey: 'pk_test_your_stripe_key_here',
    paypalClientId: 'your_paypal_client_id_here'
  },
  social: {
    facebookAppId: 'your_facebook_app_id',
    googleClientId: 'your_google_client_id'
  },
  analytics: {
    googleAnalyticsId: 'GA_MEASUREMENT_ID',
    hotjarId: 'your_hotjar_id'
  }
};