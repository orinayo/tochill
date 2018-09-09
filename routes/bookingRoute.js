const to = require('../utilities/catchErrors')
const mongoose = require('mongoose')
const User = mongoose.model('users')
const ChillSpot = mongoose.model('chillspots')

module.exports = app => {
  // PUT Request for saving user booking
  // UPDATE
  app.put(
    '/api/book/chillspots/:id/budget/:budget',
    async (req, res) => {
      let budget = parseInt(req.params.budget)
      let discount = Math.floor(budget / 2000)
      if (req.user.credits > discount) {
        req.user.credits -= discount
      } else {
        res.send({
          err: new Error(),
          message: 'You have insufficient premium credits'
        })
        return
      }
      let visitor = {
        id: req.user._id,
        avatar: req.user.avatar
      }
      let err, chillspot
      [err, chillspot] = await to(ChillSpot.findOneAndUpdate({_id: req.params.id},
        {
          $push: {'visitors': visitor}
        })
        .exec()
      )
      if (err || !chillspot) {
        res.send({
          err,
          message: 'Error occurred while saving your booking'
        })
      }
      req.user.notifications = [
        ...req.user.notifications,
        `You have booked a session at ${chillspot.name}. Have fun at the spot and share your experience in the comments!`
      ]
      const user = await req.user.save()
      res.send(user)
    }
  )
}
