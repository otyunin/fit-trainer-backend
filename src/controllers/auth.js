const User = require('../models/user')
const jwt = require('jsonwebtoken')
const passport = require('../passport')

const { secret } = require('../../config')

const signToken = user => {
  const body = { id: user._id, email: user.email }
  return jwt.sign({ user: body }, secret, {
    expiresIn: '24h' // expires in 24 hours
  })
}

module.exports = {
  signIn: async (req, res, next) => {
    passport.authenticate('local', null, function (err, user, info) {
      if (err) {
        return next(err) // will generate a 500 error
      }
      if (!user) {
        return res.status(200).json({ success: false, message: info.message })
      }
      // Generate the token
      const token = signToken(user)

      // Respond with token
      res.status(200).json({ success: true, token })
    })(req, res, next)
  },
  signUp: async (req, res) => {
    const { email, password } = req.body

    // Check if there is a user with the same email
    const foundUser = await User.findOne({ email })
    if (foundUser) {
      return res.status(400).json({
        success: false,
        message: 'Email is already in use'
      })
    }

    // Create a new user
    const newUser = new User({ email, password })
    await newUser.save()

    // Generate the token
    const token = signToken(newUser)

    // Respond with token
    res.status(201).json({ success: true, token })
  }
}
