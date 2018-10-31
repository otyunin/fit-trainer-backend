const User = require('../models/user')
const { signToken }= require('../utils/token')

module.exports = {
  verifyEmail: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.params.email })
      if (!user) {
        return res.status(400).json({ success: false, error: 'User doesn\'t exist. Please register' })
      }
      if (!user.verificationCode) {
        return res.status(400).json({ success: false, error: 'Your email has been verified' })
      }
      if (req.params.secret !== user.verificationCode) {
        return res.status(400).json({ success: false, error: 'Invalid verification code' })
      }
      // Confirm the email and give a token
      user.verificationCode = ''
      await user.save()
      // Generate the token
      const token = signToken(user)
      res.json({
        success: true,
        token,
      })
    } catch (err) {
      return res.status(400).json({ success: false, error: 'Something wrong' })
    }
  },
}
