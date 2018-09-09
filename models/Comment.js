const mongoose = require('mongoose')
const { Schema } = mongoose

const CommentSchema = new Schema({
  text: String,
  rating: String,
  author: {
    id: {
      type: Schema.ObjectId,
      ref: 'users'
    },
    username: String,
    avatar: {
      type: String,
      default: 'http://res.cloudinary.com/orinayo/image/upload/v1535843416/profile-icon-28.png'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

mongoose.model('comments', CommentSchema)
