const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tagSchema = new Schema({
  tagName: [String],
})

const userSchema = new Schema({
  name: String,
  password: String
  tags: [tagSchema]
})

const User = mongoose.model('user', userSchema)

module.exports = User
