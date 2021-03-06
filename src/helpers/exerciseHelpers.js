const Joi = require('joi')

module.exports = {
  validateBody: schema => {
    return (req, res, next) => {
      const { error } = Joi.validate(req.body, schema)

      if (error) {
        return res.status(400).json({
          success: false,
          message: error,
        })
      }
      next()
    }
  },
  schemas: {
    exerciseSchema: Joi.object().keys({
      name: Joi.string().label('Name').required(),
      measurement: Joi.string().label('Measurement type').required(),
    }),
  },
}

