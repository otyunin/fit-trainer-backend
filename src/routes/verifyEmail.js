const router = require('express-promise-router')()

const { verifyEmail } = require('../controllers/verifyEmail')

router.route('/')
  .post(verifyEmail)

module.exports = router
