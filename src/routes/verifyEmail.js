const router = require('express-promise-router')()

const { verifyEmail } = require('../controllers/verifyEmail')

router.route('/:email/:secret')
  .post(verifyEmail)

module.exports = router
