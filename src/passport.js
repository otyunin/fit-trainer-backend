const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')
const LocalStrategy = require('passport-local').Strategy

const { secret } = require('../config')
const User = require('./models/user')

// JWT Strategy
passport.use('jwt', new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: secret,
}, async (payload, done) => {
  try {
    // Find the user specified in token
    const user = await User.findById(payload.user.id)
    // If user doesn't exists, handle it
    if (!user) {
      return done(null, false)
    }
    // Otherwise, return the user
    done(null, user)
  } catch (err) {
    done(err, false)
  }
}))

// Local strategy
passport.use('local', new LocalStrategy({
  usernameField: 'email',
},
async (email, password, done) => {
  try {
    // Find the user given the email
    const user = await User.findOne({ email })
    // If not, handle it
    if (!user) {
      return done(null, false, { message: 'Incorrect email' })
    }
    // If the email has not been confirmed
    if (user.verificationCode) {
      return done(null, false, { message: 'Email not confirmed' })
    }
    // Check if the password is correct
    const isMatch = await user.isValidPassword(password)
    // If not, handle it
    if (!isMatch) {
      return done(null, false, { message: 'Incorrect password' })
    }
    // Otherwise, return the user
    done(null, user)
  } catch (err) {
    done(err, false)
  }
}))

module.exports = passport
