const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ExerciseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  measurement: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
})

const Exercise = mongoose.model('exercise', ExerciseSchema)

module.exports = Exercise
