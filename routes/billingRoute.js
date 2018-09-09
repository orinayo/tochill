const keys = require('../config/keys')
// Pass secret key to stripe
const stripe = require('stripe')(keys.stripeSecretKey)
const to = require('../utilities/catchErrors')
const requireLogin = require('../middlewares/requireLogin')

module.exports = app => {
  // POST request for handling user payment with Stripe
  // CREATE
  app.post(
    '/api/stripe',
    requireLogin,
    async (req, res) => {
      let err, charge
      [err, charge] = await to(stripe.charges.create({
        amount: 1000000,
        currency: 'NGN',
        description: 'N10000 for 10 chill points',
        source: req.body.id
      }))

      if (err || !charge) {
        res.send({
          err,
          message: 'Error occurred while processing charge'
        })
      }

      req.user.credits += 10
      const user = await req.user.save()
      res.send(user)
    }
  )
}
