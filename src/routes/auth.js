const router = require('express-promise-router')()

const { signIn, signUp } = require('../controllers/auth')

router.route('/signin')
  .post(signIn)
router.route('/signup')
  .post(signUp)

module.exports = router
