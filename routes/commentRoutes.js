const to = require('../utilities/catchErrors')
const mongoose = require('mongoose')
const ChillSpot = mongoose.model('chillspots')
const Comment = mongoose.model('comments')
const requireLogin = require('../middlewares/requireLogin')
const requireCommentOwnership = require('../middlewares/requireCommentOwnership')

module.exports = app => {
  // POST Request for adding a Comment
  // CREATE
  app.post(
    '/api/chillspots/:id/comments',
    requireLogin,
    async (req, res) => {
      // Sanitize data
      req.body.comment.text = req.sanitize(req.body.comment.text)

      const { id } = req.params
      let spotErr, chillspot, commentErr, comment
      [commentErr, comment] = await to(Comment.create(req.body.comment))
      if (commentErr || !comment) {
        res.send({
          err: commentErr,
          message: 'Error occurred while saving your comment'
        })
      }
      // Add username and id to comment and save
      comment.author.id = req.user._id
      comment.author.username = req.user.username
      comment.author.avatar = req.user.avatar
      comment.save();

      [spotErr, chillspot] = await to(ChillSpot.updateOne({_id: id},
        {
          $push: {'comments': comment}
        })
        .exec()
      )
      if (spotErr || !chillspot) {
        res.send({
          err: spotErr,
          message: 'Error occurred while adding your comment to the spot'
        })
      }
      res.send({})
    }
  )

  // PUT Request for updating a Comment
  // UPDATE
  app.put(
    '/api/chillspots/:id/comments/:comment_id',
    requireLogin,
    requireCommentOwnership,
    async (req, res) => {
      // Sanitize data
      req.body.text = req.sanitize(req.body.text)
      const { text, rating } = req.body

      let err, comment
      [err, comment] = await to(Comment.updateOne({_id: req.params.comment_id},
        {
          $set: { 'text': text, 'rating': rating }
        })
        .exec()
      )
      if (err || !comment) {
        res.send({
          err,
          error: 'Error occurred while updating comment'})
      }
      res.send({})
    }
  )

  // DELETE Request for updating a comment
  // DESTROY
  app.delete(
    '/api/chillspots/:id/comments/:comment_id',
    requireLogin,
    requireCommentOwnership,
    async (req, res) => {
      let err, raw
      [err, raw] = await to(Comment.deleteOne({
        _id: req.params.comment_id
      }))
      if (err) {
        res.send({
          err,
          message: 'Error occurred while deleting comment'
        })
      }
      res.send({})
    }
  )
}
