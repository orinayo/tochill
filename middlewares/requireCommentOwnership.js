const to = require('../utilities/catchErrors')
const mongoose = require('mongoose')
const Comment = mongoose.model('comments')

module.exports = async (req, res, next) => {
  let err, comment
  [err, comment] = await to(Comment.findById(req.params.comment_id))
  if (err) {
    res.redirect('/chillspots')
  }
  (comment.author.id.equals(req.user._id) || req.user.isAdmin) ? next()
    : res.redirect('/chillspots')
}
