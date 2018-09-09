const mongoose = require('mongoose')
const { Schema } = mongoose
// Require passportLocalMongoose
const passportLocalMongoose = require('passport-local-mongoose')

const UserSchema = new Schema({
  username: String,
  password: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  avatar: {
    type: String,
    default: 'http://res.cloudinary.com/orinayo/image/upload/v1535843416/profile-icon-28.png'
  },
  googleId: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  credits: {
    type: Number,
    default: 0
  },
  bookmarks: [
    {
      type: Schema.ObjectId,
      ref: 'chillspots'
    }
  ],
  notifications: [String],
  isAdmin: {
    type: Boolean,
    default: false
  }
})

// add passportLocal methods to UserSchema
UserSchema.plugin(passportLocalMongoose)

mongoose.model('users', UserSchema)
