/**
 * Environment configuration.
 * All external URLs and settings loaded from env vars with sensible defaults.
 */
module.exports = {
  PORT: process.env.PORT || 8001,
  PRODUCT_SERVICE_URL: process.env.PRODUCT_SERVICE_URL || 'http://product-service:8080',

  // Coupon codes and their discount percentages
  COUPONS: {
    'SAVE10': 10,
    'SHOP20': 20,
    'WELCOME15': 15,
  },
};
