const router = require('express-promise-router')()

const { validateBody, schemas } = require('../helpers/exerciseHelpers.js')
const { createExercise } = require('../controllers/exercise')

router.route('/')
  .post(validateBody(schemas.exerciseSchema), createExercise)

module.exports = router
