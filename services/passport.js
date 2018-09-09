// Require passport for authentication
const passport = require('passport')
// GoogleOAuth 2.0 strategy for passport
const GoogleStrategy = require('passport-google-oauth20').Strategy
// Local strategy for passport
const LocalStrategy = require('passport-local')
const mongoose = require('mongoose')
const keys = require('../config/keys')
const User = mongoose.model('users')

// Pass id of user model instance to create cookie
passport.serializeUser((user, done) => {
  done(null, user.id)
})
// Find user by id
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user)
    })
})

// Initialize GoogleStrategy, pass the client options
// and callback URL used after user authentication
passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
  },
  // Pass tokens and profile object received from GoogleOAuth
  async (accessToken, refreshToken, profile, done) => {
    // Check if user already exists
    const existingUser = await User.findOne({
      googleId: profile.id
    })
    if (existingUser) {
      return done(null, existingUser)
    }
    // No user exists, make new record
    const user = await new User({
      googleId: profile.id,
      username: profile.displayName,
      email: profile.emails[0].value,
      avatar: profile.photos[0].value
    }).save()
    done(null, user)
  })
)

// Create LocalStrategy with passportLocaLMongoose function
passport.use(new LocalStrategy(User.authenticate()))
