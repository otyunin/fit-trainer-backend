const Joi = require('joi')

const workoutSchema = Joi.object().keys({
  exercise: Joi.string().required().label('Field'),
  repeats: Joi.number().min(0).required().label('Field'),
  measurement: Joi.number().min(0).required().label('Field'),
})

const workoutsSchema = Joi.array().items(workoutSchema)

module.exports = {
  validateBody: () => {
    return (req, res, next) => {
      const { error } = Joi.validate(req.body.exercises, workoutsSchema, { allowUnknown: true })

      if (error) {
        return res.status(400).json({
          success: false,
          message: 'Validation error',
        })
      }
      next()
    }
  },
  schemas: {
    workoutsSchema: Joi.array().items(workoutSchema)
  },
}

