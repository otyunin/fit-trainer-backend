const router = require('express-promise-router')()

const { validateBody, schemas } = require('../helpers/exerciseHelpers.js')
const { createExercise, getExercises, updateExercises } = require('../controllers/exercise')

router.route('/')
  .post(validateBody(schemas.exerciseSchema), createExercise)
  .get(getExercises)
  .put(updateExercises)

module.exports = router
