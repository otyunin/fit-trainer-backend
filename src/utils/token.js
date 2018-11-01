const jwt = require('jsonwebtoken')
const passport = require('passport')

const { secret } = require('../../config')

const signToken = user => {
  const body = { id: user._id, email: user.email }
  return jwt.sign({ user: body }, secret, {
    expiresIn: '24h', // expires in 24 hours
  })
}

const checkToken = function (req, res, next) {
  passport.authenticate('jwt', { session: false }, function (err, user, info) {
    if (err) {
      return next(err) // will generate a 500 error
    }
    if (!user) {
      return res.status(403).json({ success: false, message: info.message })
    }
    res.locals.user = user
    next()
  })(req, res, next)
}

module.exports = {
  signToken,
  checkToken
}
