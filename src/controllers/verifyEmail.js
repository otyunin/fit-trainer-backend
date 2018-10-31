const User = require('../models/user')
const { signToken }= require('../utils/token')

module.exports = {
  verifyEmail: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email })
      if (!user) {
        return res.status(200).json({ success: false, message: 'User doesn\'t exist. Please register' })
      }
      if (!user.verificationCode) {
        return res.status(200).json({ success: false, message: 'Your email has been verified' })
      }
      if (req.body.verificationCode !== user.verificationCode) {
        return res.status(200).json({ success: false, message: 'Invalid verification code' })
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
      return res.status(400).json({ success: false, message: 'Something wrong' })
    }
  },
}
