const mongoose = require('mongoose')
const { Schema } = mongoose

const ChillSpotSchema = new Schema({
  name: String,
  budget: String,
  image: String,
  description: String,
  location: String,
  lat: Number,
  lon: Number,
  createdAt: {
    type: Date,
    default: Date.now
  },
  author: {
    id: {
      type: Schema.ObjectId,
      ref: 'users'
    },
    username: String
  },
  comments: [
    {
      type: Schema.ObjectId,
      ref: 'comments'
    }
  ],
  visitors: [
    {
      id: {
        type: Schema.ObjectId,
        ref: 'users'
      },
      avatar: String
    }
  ]
})

mongoose.model('chillspots', ChillSpotSchema)
