const to = require('../utilities/catchErrors')
const mongoose = require('mongoose')
const User = mongoose.model('users')
const async = require('async')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const keys = require('../config/keys')

module.exports = app => {
  // POST Request for sending password reset
  // CREATE
  app.post(
    '/api/forgot',
    (req, res, next) => {
      async.waterfall([
        done => {
          crypto.randomBytes(20, (err, buff) => {
            let token = buff.toString('hex')
            done(err, token)
          })
        },
        (token, done) => {
          User.findOne({ email: req.body.email },
            (err, user) => {
              if (err) {
                res.send({
                  err,
                  message: 'Error occurred while trying to find user email'
                })
              }
              if (!user) {
                res.send({
                  err: new Error(),
                  message: 'No account with that email address exists'
                })
              }
              user.resetPasswordToken = token
              user.resetPasswordExpires = Date.now() + 3600000 // 1 hour
              user.save(err => {
                done(err, token, user)
              })
            })
        },
        (token, user, done) => {
          let smtpTransport = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
              user: 'ipatterncode@gmail.com',
              pass: keys.googleMailPassword
            }
          })
          let mailOptions = {
            to: user.email,
            from: 'ipatterncode@gmail.com',
            subject: 'ToChill Password Reset',
            text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://' + req.headers.host + '/reset/' + token + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
          }
          smtpTransport.sendMail(mailOptions, err => {
            done(err, 'done')
          })
        }
      ], err => {
        if (err) {
          return next(err)
        }
        res.send({})
      })
    }
  )

  // GET Request for validating a reset token
  app.get(
    '/api/reset/:token',
    async (req, res) => {
      let err, user
      [err, user] = await to(User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() }
      }))
      if (err) {
        res.send({
          err,
          message: 'Error occurred while trying to validate the token'
        })
      }
      if (!user) {
        res.send(false)
      }
      res.send(true)
    }
  )

  // POST Request for handling password reset
  // UPDATE
  app.post(
    '/api/reset/:token',
    (req, res) => {
      async.waterfall([
        done => {
          User.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now() }
          },
          (err, user) => {
            if (err) {
              res.send({
                err,
                message: 'Error occurred while trying to get details'
              })
            }
            if (!user) {
              res.send({
                err: new Error(),
                message: 'Password reset token is invalid or has expired'
              })
            }
            if (req.body.password === req.body.confirm) {
              user.setPassword(req.body.password, err => {
                if (err) {
                  res.send({
                    err,
                    message: 'Error occurred while trying to reset password'
                  })
                }
                user.resetPasswordToken = undefined
                user.resetPasswordExpires = undefined
                user.save(err => {
                  if (err) {
                    res.send({
                      err,
                      message: 'Error occurred while saving changes'
                    })
                  }
                  req.logIn(user, err => {   
                    done(err, user)
                  })
                })
              })
            } else {
              res.send({
                err: new Error(),
                message: 'Passwords do not match'
              })
            }
          })
        },
        (user, done) => {
          let smtpTransport = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
              user: 'ipatterncode@gmail.com',
              pass: keys.googleMailPassword
            }
          })
          let mailOptions = {
            to: user.email,
            from: 'ipatterncode@gmail.com',
            subject: 'Your password has been changed',
            text: 'Hello,\n\n' +
            'This is a confirmation that the password for your account ' + user.email +
            ' has just been changed.\n'
          }
          smtpTransport.sendMail(mailOptions, err => {
            done(err, 'done')
          })
        }
      ], err => {
        if (err) {
          res.send({
            err,
            message: 'Error occurred while updating password'
          })
        }
        res.send(req.user)
      })
    }
  )
}
