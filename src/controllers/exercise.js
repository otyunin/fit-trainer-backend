const Exercise = require('../models/exercise')
const User = require('../models/user')

module.exports = {
  createExercise: async (req, res) => {
    try {
      const { email, name, measurement } = req.body
      // Check if there is a user with the same email
      const foundUser = await User.findOne({ email })
      if (!foundUser) {
        return res.status(200).json({
          success: false,
          message: 'User not found',
        })
      }
      // Create new exercise
      const exercise = new Exercise({ user: foundUser, name, measurement })
      // Save the exercise in the collection of exercises
      await exercise.save()
      // Save in the user's model
      foundUser.exercises.push(exercise)
      await foundUser.save()
      res.status(201).json({
        success: true,
      })
    } catch (err) {
      return res.status(400).json({ success: false, message: 'Something wrong' })
    }
  },
}
