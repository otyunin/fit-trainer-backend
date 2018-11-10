const router = require('express-promise-router')()

const { validateBody, schemas } = require('../helpers/workoutHelpers.js')
const { getWorkoutDates, createWorkout, getWorkout, updateWorkout, deleteWorkout } = require('../controllers/workout')

router.route('/dates')
  .get(getWorkoutDates)

router.route('/:date')
  .get(getWorkout)
  .post(validateBody(schemas.workoutsSchema), createWorkout)
  .put(validateBody(schemas.workoutsSchema), updateWorkout)
  .delete(deleteWorkout)

module.exports = router
