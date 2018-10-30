const jwt = require('jsonwebtoken')

const { secret } = require('../../config')

const signToken = user => {
  const body = { id: user._id, email: user.email }
  return jwt.sign({ user: body }, secret, {
    expiresIn: '24h', // expires in 24 hours
  })
}

module.exports = {
  signToken
}
