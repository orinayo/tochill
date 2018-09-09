const to = require('../utilities/catchErrors')
const mongoose = require('mongoose')
const ChillSpot = mongoose.model('chillspots')
const Comment = mongoose.model('comments')
const User = mongoose.model('users')

const data = [
  {
    name: "Cloud's Rest",
    image: 'https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
  },
  {
    name: 'Desert Mesa',
    image: 'https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
  },
  {
    name: 'Canyon Floor',
    image: 'https://farm1.staticflickr.com/189/493046463_841a18169e.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
  }
]

const seedDB = async () => {
  let err
  // Remove all ChillSpots and Comments
  [err] = await to(ChillSpot.remove({}))
  if (err) {
    console.log('Error occurred while removing spots')
    return
  }
  console.log('removed spots!');

  [err] = await to(Comment.remove({}))
  if (err) {
    console.log('Error occurred while removing comments')
    return
  }
  console.log('removed comments!');

  [err] = await to(User.remove({}))
  if (err) {
    console.log('Error occurred while removing users')
    return
  }
  console.log('removed users!')

  // // add a few ChillSpots
  // data.forEach(async seed => {
  //   let spotErr, commentErr, newChillSpot, newComment
  //   // Use Promise.all to run create Chillspot and Comment in parallel
  //   // as they have no dependency on each other
  //   [[spotErr, newChillSpot], [commentErr, newComment]] = await Promise.all([
  //     to(ChillSpot.create(seed)),
  //     to(Comment.create({
  //       text: 'This place is great, but I wish there was internet',
  //       author: 'Homer'
  //     }))
  //   ])
  //   if (spotErr) {
  //     console.log('Error occurred while creating spot')
  //     return
  //   }
  //   console.log('created new spot')
  //   if (commentErr) {
  //     console.log('Error occurred while creating comment')
  //     return
  //   }
  //   newChillSpot.comments.push(newComment)
  //   await newChillSpot.save()
  //   console.log('Created new comment')
  // })
}

module.exports = seedDB
