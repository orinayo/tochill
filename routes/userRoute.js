const to = require('../utilities/catchErrors')
const mongoose = require('mongoose')
const User = mongoose.model('users')

module.exports = app => {
  // GET Request for retrieving user profile
  // INDEX
  app.get(
    '/api/users/:id',
    async (req, res) => {
      let err, user
      [err, user] = await to(User.findById(req.params.id))
      if (err || !user) {
        res.send({
          err,
          message: 'Error occurred while getting user profile'
        })
      }
      res.send(user)
    }
  )
}
