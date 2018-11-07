const router = require('express-promise-router')()

const { createWorkout, getWorkout, updateWorkout } = require('../controllers/workout')

router.route('/')
  .get(getWorkout)
  .post(createWorkout)
  .put(updateWorkout)

module.exports = router
