const Exercise = require('../models/exercise')
const User = require('../models/user')

const _ = require('lodash')

module.exports = {
  createExercise: async (req, res, next) => {
    try {
      const { name, measurement } = req.body
      // Check if there is a user with the same email
      const userId = res.locals.user._id
      const user = await User.findById(userId)
      if (!user) {
        return res.status(400).json({
          success: false,
          message: 'User not found',
        })
      }
      const foundExercises = await Exercise.find({ user: userId })
      await user.save((err) => {
        if (err) next(err)
        const exercise = new Exercise({ name, measurement })
        exercise.user = user._id
        exercise.order = foundExercises.length
        exercise.save()
      })
      res.status(201).json({
        success: true,
      })
    } catch (err) {
      return res.status(400).json({ success: false, message: 'Something wrong' })
    }
  },
  getExercises: async (req, res) => {
    const userId = res.locals.user._id
    const user = await User.findById(userId)
    if (!user) {
      return res.status(400).json({ success: false, message: 'The user is not found' })
    }
    const exercises = await Exercise.find({ user: userId }).populate('user')
    res.status(200).json(exercises)
  },
  updateExercises: async (req, res, next) => {
    try {
      const userId = res.locals.user._id
      const user = await User.findById(userId).populate('Exercise')
      if (!user) {
        return res.status(400).json({ success: false, message: 'The user is not found' })
      }
      let updatedExercises = req.body
      await updatedExercises.forEach(updatedExercise => {
        let body = {
          name: updatedExercise.name,
          measurement: updatedExercise.measurement,
          order: updatedExercise.order,
        }
        Exercise.findByIdAndUpdate(updatedExercise._id, body, function (err) {
          if (err) next(err)
        })
      })
      // For delete
      let foundExercises = await Exercise.find({})
      foundExercises = foundExercises.map(exercise => exercise._id.toString())
      updatedExercises = updatedExercises.map(exercise => exercise._id)
      const difference = _.difference(foundExercises, updatedExercises)
      difference.forEach(id => {
        Exercise.findByIdAndDelete(id, function (err) {
          if (err) next(err)
        })
      })
      return res.status(200).json({ success: true })
    } catch (err) {
      return res.status(400).json({ success: false, message: 'Something wrong' })
    }
  },
}
