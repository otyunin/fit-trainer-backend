const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ExerciseSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  name: {
    type: String,
    required: true,
  },
  measurement: {
    type: String,
    required: true,
  },
})

const Exercise = mongoose.model('Exercise', ExerciseSchema)

module.exports = Exercise
