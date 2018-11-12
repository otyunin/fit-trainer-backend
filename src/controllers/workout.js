const Workout = require('../models/workout')
const User = require('../models/user')
const toDate = require('../utils/date')
const moment = require('moment')

module.exports = {
  getWorkoutDates: async (req, res) => {
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
      let workout = await Workout.find({ user: userId })
      if (workout.length > 0) {
        workout = workout.map(workoutExercise => workoutExercise.date)
      }
      res.status(200).json({
        success: true,
        dates: workout,
      })
    } catch (err) {
      return res.status(400).json({ success: false, message: 'Something wrong' })
    }
  },
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
      if (req.body.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'A workout should not be empty',
        })
      }
      if (moment(req.params.date, 'YYYY-MM-DD').isBefore(moment().format('YYYY-MM-DD'))) {
        return res.status(400).json({
          success: false,
          message: 'You cannot create a workout on a date earlier than the current one',
        })
      }
      if (!moment(req.params.date).isValid()) {
        return res.status(400).json({
          success: false,
          message: 'Date is invalid',
        })
      }
      const foundWorkout = await Workout.findOne({
        user: userId,
        date: {
          $lte: toDate(req.params.date),
          $gte: toDate(req.params.date),
        },
      })
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
          date: req.params.date,
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
      const workout = await Workout.findOne({
        user: userId,
        date: {
          $lte: toDate(req.params.date),
          $gte: toDate(req.params.date),
        },
      }).populate('exercises.exercise')
      if (!workout) {
        return res.status(400).json({
          success: false,
          message: 'Workout not found',
        })
      }
      workout.exercises.forEach((exercise, index) => {
        if (exercise.exercise === null) {
          workout.exercises.splice(index, 1)
        }
      })
      workout.save()

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
      if (updatedWorkout.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'A workout should not be empty',
        })
      }
      const workout = await Workout.findOne({
        _id: updatedWorkout._id,
        date: { $lte: toDate(req.params.date) },
      })
      if (!workout) {
        return res.status(400).json({
          success: false,
          message: 'Workout not found',
        })
      }

      workout.exercises = updatedWorkout.exercises
      await workout.save()

      const newWorkout = await Workout.findOne({
        _id: updatedWorkout._id,
        date: { $lte: toDate(req.params.date) },
      }).populate('exercises.exercise')

      return res.status(200).json({ success: true, workout: newWorkout })
    } catch (err) {
      return res.status(400).json({ success: false, message: 'Something wrong' })
    }
  },
  deleteWorkout: async (req, res) => {
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
      const workout = await Workout.findOne({
        user: userId,
        date: {
          $lte: toDate(req.params.date),
          $gte: toDate(req.params.date),
        },
      })
      if (!workout) {
        return res.status(400).json({
          success: false,
          message: 'Workout not found',
        })
      }

      workout.remove()

      res.status(200).json({
        success: true,
      })
    } catch (err) {
      return res.status(400).json({ success: false, message: 'Something wrong' })
    }
  },
  deleteWorkoutExercise: async (req, res) => {
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
      const workout = await Workout.findOne({
        user: userId,
        date: {
          $lte: toDate(req.params.date),
          $gte: toDate(req.params.date),
        },
      })
      if (!workout) {
        return res.status(400).json({
          success: false,
          message: 'Workout not found',
        })
      }

      const indexToRemove = workout.exercises.findIndex(exercise => exercise._id == req.params.id)

      if (indexToRemove === -1) {
        return res.status(400).json({
          success: false,
          message: 'Exercise in workout not found',
        })
      }

      workout.exercises = workout.exercises.map((exercise, index) => {
        if (index > indexToRemove) {
          exercise.order -= 1
        }
        return exercise
      })

      workout.exercises.splice(indexToRemove, 1)
      workout.save()

      res.status(200).json({
        success: true,
      })
    } catch (err) {
      return res.status(400).json({ success: false, message: 'Something wrong' })
    }
  },
}
