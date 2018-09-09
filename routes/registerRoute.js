const passport = require('passport')
const mongoose = require('mongoose')
const User = mongoose.model('users')
const keys = require('../config/keys')

module.exports = app => {
  // POST request for registering a User
  // CREATE
  app.post(
    '/api/register',
    (req, res) => {
      let isAdmin = false
      if (req.body.adminCode === keys.adminCode) {
        isAdmin = true
      }
      User.register(
        new User({
          username: req.body.username,
          email: req.body.email,
          isAdmin,
          avatar: req.body.avatar
        }),
        req.body.password,
        (err, user) => {
          if (err) {
            res.send({
              err,
              message: 'Error occured while signing up'
            })
          }
          passport.authenticate('local')(req, res, function () {
            res.send(req.user)
          })
        }
      )
    }
  )
}
