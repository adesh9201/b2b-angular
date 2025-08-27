export const environment = {
  production: true,
  apiUrl: 'https://api.fabhub.com/api',
  appName: 'FabHub',
  version: '1.0.0',
  enableLogging: false,
  enableAnalytics: true,
  features: {
    enableVendorDashboard: true,
    enableAdvancedSearch: true,
    enableWishlist: true,
    enableReviews: true,
    enableChat: true
  },
  payment: {
    stripePublishableKey: 'pk_live_your_stripe_key_here',
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