const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const Schema = mongoose.Schema

const SALT_ROUNDS = 10

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  verificationCode: {
    type: String,
    default: '',
  },
  created: {
    type: Date,
    default: Date.now,
  },
})

UserSchema.pre('save', async function (next) {
  const user = this
  try {
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next()
    // Generate a salt
    const salt = await bcrypt.genSaltSync(SALT_ROUNDS)
    // Generate a password hash and re-assign hashed version over original, plain text password
    this.password = await bcrypt.hashSync(this.password, salt)
    next()
  } catch (error) {
    next(error)
  }
})

UserSchema.methods.isValidPassword = async function (newPassword) {
  try {
    return await bcrypt.compareSync(newPassword, this.password)
  } catch (error) {
    throw new Error(error)
  }
}

const User = mongoose.model('user', UserSchema)

module.exports = User
