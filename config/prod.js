// prod.js - production keys
module.exports = {
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY,
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  googleGeocoderKey: process.env.GOOGLE_GEOCODER_KEY,
  adminCode: process.env.ADMIN_CODE,
  googleMailPassword: process.env.GOOGLE_MAIL_PASSWORD,
  stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY
}
