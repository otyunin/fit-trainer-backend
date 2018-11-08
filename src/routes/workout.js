const router = require('express-promise-router')()

const { getWorkoutDates, createWorkout, getWorkout, updateWorkout } = require('../controllers/workout')

router.route('/dates')
  .get(getWorkoutDates)

router.route('/:date')
  .get(getWorkout)
  .post(createWorkout)
  .put(updateWorkout)

module.exports = router
