const Workout = require('../models/workout')
const User = require('../models/user')
const toDate = require('../utils/date')
const moment = require('moment')

module.exports = {
  createWorkout: async (req, res, next) => {
    try {
      // Check if there is a user with the same email
      const userId = res.locals.user._id
      const user = await User.findById(userId)
      if (!user) {
        return res.status(400).json({
          success: false,
          message: 'User not found',
        })
      }
      if (!moment(toDate(req.params.date)).isValid()) {
        return res.status(400).json({
          success: false,
          message: 'Date is invalid',
        })
      }
      const foundWorkout = await Workout.find({ user: userId, date: toDate(req.params.date) })
      if (foundWorkout) {
        return res.status(400).json({
          success: false,
          message: 'A workout has already been created for this date',
        })
      }
      await user.save((err) => {
        if (err) next(err)
        const workout = new Workout({
          exercises: req.body.map(exercise => ({
            exercise: exercise.exercise,
            repeats: exercise.repeats,
            measurement: exercise.measurement,
            order: exercise.order,
          })),
          user: user._id,
          date: toDate(req.params.date),
        })
        workout.save()
      })
      res.status(201).json({
        success: true,
      })
    } catch (err) {
      return res.status(400).json({ success: false, message: 'Something wrong' })
    }
  },
  getWorkout: async (req, res) => {
    try {
      // Check if there is a user with the same email
      const userId = res.locals.user._id
      const user = await User.findById(userId)
      if (!user) {
        return res.status(400).json({
          success: false,
          message: 'User not found',
        })
      }
      const workout = await Workout.findOne({ user: userId, date: toDate(req.params.date) })
        .populate('exercises.exercise')
      if (!workout) {
        return res.status(400).json({
          success: false,
          message: 'Workout not found',
        })
      }

      res.status(200).json({
        success: true,
        workout,
      })
    } catch (err) {
      return res.status(400).json({ success: false, message: 'Something wrong' })
    }
  },
  updateWorkout: async (req, res) => {
    try {
      const userId = res.locals.user._id
      const user = await User.findById(userId)
      if (!user) {
        return res.status(400).json({ success: false, message: 'The user is not found' })
      }
      let updatedWorkout = req.body
      const workout = await Workout.find({ _id: updatedWorkout._id, date: toDate(req.params.date) })
      if (!workout) {
        return res.status(400).json({
          success: false,
          message: 'Workout not found',
        })
      }

      workout.exercises = updatedWorkout.exercises
      workout.save()
      workout.populate('exercises.exercise')

      return res.status(200).json({ success: true, workout })
    } catch (err) {
      return res.status(400).json({ success: false, message: 'Something wrong' })
    }
  },
}
