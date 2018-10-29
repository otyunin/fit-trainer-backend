const User = require('../models/user')

module.exports = {
  signIn: async (req, res) => {
    res.send('Sign in called')
  },
  signUp: async (req, res) => {
    const { email, password, repeatPassword } = req.body

    // Check if there is a user with the same email
    const foundUser = await User.findOne({ email })
    if (foundUser) {
      return res.status(400).json({
        success: false,
        message: 'Email is already in use'
      })
    }
    // Check the passwords match
    if (password !== repeatPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords don\'t match'
      })
    }

    // Create a new user
    const newUser = new User({ email, password })
    await newUser.save()

    res.status(201).json({ success: true })
  }
}
