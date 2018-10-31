const User = require('../models/user')
const passport = require('../passport')
const randomstring = require('randomstring')
const { signToken }= require('../utils/token')

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
        message: 'Email is already in use',
      })
    }

    const verificationCode = randomstring.generate()

    // Create a new user
    const newUser = new User({ email, password, verificationCode })
    await newUser.save()

    // Url to confirm email
    const verificationUrl = `http://localhost:3000/verify-email/${newUser.email}/${verificationCode}`

    console.log('Email confirmation:', verificationUrl)

    // Respond with verification code
    res.status(201).json({
      success: true,
      verificationCode,
    })
  },
}
