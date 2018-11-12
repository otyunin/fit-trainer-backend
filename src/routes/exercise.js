const router = require('express-promise-router')()

const { validateBody, schemas } = require('../helpers/exerciseHelpers.js')
const {
  createExercise,
  getExercises,
  updateExercises,
  deleteExercise,
} = require('../controllers/exercise')

router.route('/')
  .post(validateBody(schemas.exerciseSchema), createExercise)
  .get(getExercises)
  .put(updateExercises)

router.route('/:id')
  .delete(deleteExercise)

module.exports = router
