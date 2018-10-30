const router = require('express-promise-router')()

const { validateBody, schemas } = require('../helpers/authHelpers.js')
const { signIn, signUp } = require('../controllers/auth')

router.route('/signin')
  .post(validateBody(schemas.loginSchema), signIn)
router.route('/signup')
  .post(validateBody(schemas.registerSchema), signUp)

module.exports = router
