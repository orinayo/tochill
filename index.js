const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const keys = require('./config/keys')
const expressSanitizer = require('express-sanitizer')
require('./models/ChillSpot')
require('./models/Comment')
require('./models/User')
// Import Passport configuration
require('./services/passport')

// Set up mongoose connection
mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true },
  (error) => {
    if (error) {
      console.log(error)
    }
  }
)

// Get the default connection
const db = mongoose.connection
// Listen to db events
db.on('connected', () => console.log(`Successfully opened a connection to ${keys.mongoURI}`))
db.on('disconnected', () => console.log(`Successfully disconnected from ${keys.mongoURI}`))
db.on('error', () => console.log(`An error occured while connecting to the ${keys.mongoURI}`))
// require('./mongodb/seed')()

const app = express()

app.use(require('express-session')({
  secret: keys.cookieKey,
  resave: false,
  saveUninitialized: false
}))

app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(expressSanitizer())

app.use(passport.initialize())
app.use(passport.session())

require('./routes/chillspotRoutes')(app)
require('./routes/commentRoutes')(app)
require('./routes/registerRoute')(app)
require('./routes/authRoutes')(app)
require('./routes/userRoute')(app)
require('./routes/bookmarkRoutes')(app)
require('./routes/passwordResetRoutes')(app)
require('./routes/billingRoute')(app)
require('./routes/bookingRoute')(app)

if (process.env.NODE_ENV === 'production') {
  // Express will serve production assets (main.js, main.css)
  app.use(express.static('client/build'))
  // Express will serve index.html if it doesn't recognize route
  const path = require('path')
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, 'client', 'build', 'index.html')
    )
  })
}

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Listening on ${port}`))
