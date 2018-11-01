const router = require('express-promise-router')()

const { validateBody, schemas } = require('../helpers/exerciseHelpers.js')
const { createExercise, getExercises } = require('../controllers/exercise')

router.route('/')
  .post(validateBody(schemas.exerciseSchema), createExercise)
  .get(getExercises)

module.exports = router
