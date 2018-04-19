const mongoose         = require('mongoose')
// const bcrypt           = require('bcrypt')

const Schema           = mongoose.Schema

// SALT_WORK_FACTOR = 10;
//
// UserSchema.pre('save', { var user = this;
// // only hash the password if it has been modified (or is new)
// if (!user.isModified('password')) return next();
//
// // generate a salt
// bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
//   if (err) return next(err);
//
//   // hash the password along with our new salt
//   bcrypt.hash(user.password, salt, function(err, hash) {
//       if (err) return next(err);
//
//       // override the cleartext password with the hashed one
//       user.password = hash;
//       next();
//   });

const tagSchema = new Schema({
  tagName: [String]
})

const userSchema = new Schema({
  username: { type: String, required:true, index: {unique: true} },
  email: { type: String, required:true },
  password:{ type: String, require: true },
  tags: [tagSchema]
})

const User = mongoose.model('user', userSchema)

module.exports = User
