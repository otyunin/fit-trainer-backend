const Joi = require('joi')

module.exports = {
  validateBody: schema => {
    return (req, res, next) => {
      const { error } = Joi.validate(req.body, schema)

      if (error) {
        return res.status(400).json({
          success: false,
          message: 'Email or password invalid',
        })
      }
      next()
    }
  },
  schemas: {
    loginSchema: Joi.object().keys({
      email: Joi.string().email({ minDomainAtoms: 2 }).label('Email').required(),
      password: Joi.string().min(6).max(30).regex(/^[a-zA-Z0-9]{6,30}$/).label('Password').required(),
    }),
    registerSchema: Joi.object().keys({
      email: Joi.string().email({ minDomainAtoms: 2 }).label('Email').required(),
      password: Joi.string().min(6).max(30).regex(/^[a-zA-Z0-9]{6,30}$/).label('Password').required(),
      repeatPassword: Joi.any().valid(Joi.ref('password')).required().label('Password Confirmation')
        .options({ language: { any: { allowOnly: 'Passwords don\'t match' } } }),
    }),
  },
}

