const router = require('express-promise-router')()

const { createWorkout, getWorkout } = require('../controllers/workout')

router.route('/')
  .get(getWorkout)
  .post(createWorkout)

module.exports = router
