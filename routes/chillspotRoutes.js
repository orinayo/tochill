const to = require('../utilities/catchErrors')
const mongoose = require('mongoose')
const ChillSpot = mongoose.model('chillspots')
const User = mongoose.model('users')
const requireLogin = require('../middlewares/requireLogin')
const requireSpotOwnership = require('../middlewares/requireSpotOwnership')
const keys = require('../config/keys')

const NodeGeocoder = require('node-geocoder')
const options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: keys.googleGeocoderKey,
  formatter: null
}
const geocoder = NodeGeocoder(options)

module.exports = app => {
  // GET Request for retrieving all Chillspots
  // INDEX
  app.get(
    '/api/chillspots',
    async (req, res) => {
      let err, chillspots
      [err, chillspots] = await to(ChillSpot.find({}).select({ comments: false }))
      if (err || !chillspots) {
        res.send({
          err,
          message: 'Error occurred while getting spots'
        })
      }
      res.send(chillspots)
    }
  )

  // POST Request for creating a new Chillspot
  // CREATE
  app.post(
    '/api/chillspots',
    requireLogin,
    (req, res) => {
      // Sanitize data
      req.body.chillspot.name = req.sanitize(req.body.chillspot.name)
      req.body.chillspot.image = req.sanitize(req.body.chillspot.image)
      req.body.chillspot.description = req.sanitize(req.body.chillspot.description)

      const { name, image, description, budget, location } = req.body.chillspot
      let author = {
        id: req.user._id,
        username: req.user.username
      }

      geocoder.geocode(location, async (error, data) => {
        if (error || !data.length) {
          res.send({
            error,
            message: 'Invalid address'
          })
        }
        const lat = data[0].latitude
        const lon = data[0].longitude
        const location = data[0].formattedAddress
        let err, chillspot
        [err, chillspot] = await to(ChillSpot.create({
          name,
          budget,
          image,
          description,
          location,
          lat,
          lon,
          author
        }))
        if (err || !chillspot) {
          res.send({
            err,
            message: 'Error occurred while creating spot'
          })
        }
  
        res.send({})
      })
    }
  )

  // GET Request for retrieving one Chillspot
  // INDEX
  app.get(
    '/api/chillspots/:id',
    async (req, res) => {
      const { id } = req.params
      let err, chillspot
      [err, chillspot] = await to(ChillSpot.findById(id).populate('comments').exec())
      if (err || !chillspot) {
        res.send({
          err,
          message: 'Error occurred while getting spot'
        })
      }
      res.send(chillspot)
    }
  )

  // PUT Request for updating a chillspot
  // UPDATE
  app.put(
    '/api/chillspots/:id',
    requireLogin,
    requireSpotOwnership,
    async (req, res) => {
      // Sanitize data
      req.body.name = req.sanitize(req.body.name)
      req.body.image = req.sanitize(req.body.image)
      req.body.description = req.sanitize(req.body.description)

      const { name, image, description, budget, location } = req.body

      geocoder.geocode(location, async (error, data) => {
        if (error || !data.length) {
          res.send({
            error,
            message: 'Invalid address'
          })
        }
        const lat = data[0].latitude
        const lon = data[0].longitude
        const location = data[0].formattedAddress
        let err, chillspot
        [err, chillspot] = await to(ChillSpot.updateOne({_id: req.params.id},
          {
            $set: {
              'name': name,
              'image': image,
              'description': description,
              'budget': budget,
              'location': location,
              'lat': lat,
              'lon': lon
            }
          })
          .exec()
        )
        if (err || !chillspot) {
          res.send({
            err,
            message: 'Error occurred while updating spot'
          })
        }
        res.send({})
      })
    }
  )

  // DELETE Request for updating a chillspot
  // DESTROY
  app.delete(
    '/api/chillspots/:id',
    requireLogin,
    requireSpotOwnership,
    async (req, res) => {
      let err, raw
      try {
        User.updateMany({
          bookmarks: {
            $elemMatch: { id: req.params.id }
          }
        },
        {
          $pullAll: { 'bookmarks': req.params.spotId }
        })
      } catch (e) {
        if (e) {
          res.send({
            err,
            message: 'Error occurred while deleting spot'
          })
        }
      }

      [err, raw] = await to(ChillSpot.deleteOne({
        _id: req.params.id
      }))
      if (err) {
        res.send({
          err,
          message: 'Error occurred while deleting spot'
        })
      }
      res.send({})
    }
  )
}
