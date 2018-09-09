const to = require('../utilities/catchErrors')
const mongoose = require('mongoose')
const ChillSpot = mongoose.model('chillspots')

module.exports = async (req, res, next) => {
  let err, chillspot
  [err, chillspot] = await to(ChillSpot.findById(req.params.id).select({ comments: false }))
  if (err) {
    res.redirect('/chillspots')
  }
  (chillspot.author.id.equals(req.user._id) || req.user.isAdmin) ? next()
    : res.redirect('/chillspots')
}
