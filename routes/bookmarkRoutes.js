const to = require('../utilities/catchErrors')
const mongoose = require('mongoose')
const User = mongoose.model('users')
const requireLogin = require('../middlewares/requireLogin')

module.exports = app => {
  // PUT Request for saving a bookmark
  // UPDATE
  app.put(
    '/api/bookmarks/:spotId',
    requireLogin,
    async (req, res) => {
      let err, user
      [err, user] = await to(User.updateOne({_id: req.user._id},
        {
          $push: {'bookmarks': req.params.spotId}
        })
        .exec()
      )
      if (err || !user) {
        res.send({
          err,
          message: 'Error occurred while saving your bookmark'
        })
      }
      res.send({})
    }
  )

  // DELETE Request for removing a bookmark
  // DESTROY
  app.delete(
    '/api/bookmarks/:spotId',
    requireLogin,
    async (req, res) => {
      let err, user
      [err, user] = await to(User.updateOne({_id: req.user._id},
        {
          $pull: { 'bookmarks': req.params.spotId }
        })
        .exec()
      )
      if (err || !user) {
        res.send({
          err,
          message: 'Error occurred while deleting your bookmark'
        })
      }
      res.send({})
    }
  )
}
