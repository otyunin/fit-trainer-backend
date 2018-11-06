const mongoose = require('mongoose')

const Schema = mongoose.Schema

const WorkoutExcercisesSchema = new Schema({
  exercise: {
    type: Schema.Types.ObjectId,
    ref: 'exercise',
  },
  repeats: {
    type: Number,
    required: true,
  },
  measurement: {
    type: Number,
    required: true,
  },
  order: {
    type: Number,
  },
})

const WorkoutSchema = new Schema({
  exercises: [WorkoutExcercisesSchema],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
})

const Workout = mongoose.model('workout', WorkoutSchema)

module.exports = Workout
