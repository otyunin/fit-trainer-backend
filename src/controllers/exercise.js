const Exercise = require('../models/exercise')
const User = require('../models/user')

module.exports = {
  createExercise: async (req, res) => {
    try {
      const { name, measurement } = req.body
      // Check if there is a user with the same email
      const userId = res.locals.user._id
      const user = await User.findById(userId)
      if (!user) {
        return res.status(200).json({
          success: false,
          message: 'User not found',
        })
      }
      // Create new exercise
      const exercise = new Exercise({ name, measurement })
      // Save the exercise in the collection of exercises
      exercise.user = user
      await exercise.save()
      // Save in the user's model
      user.exercises.push(exercise)
      await user.save()
      res.status(201).json({
        success: true,
      })
    } catch (err) {
      return res.status(400).json({ success: false, message: 'Something wrong' })
    }
  },
  getExercises: async (req, res) => {
    const userId = res.locals.user._id
    const user = await User.findById(userId).populate('Exercise')
    res.status(200).json(user.exercises)
  },
}
