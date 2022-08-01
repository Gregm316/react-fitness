const mongoose = require('mongoose');

const { Schema } = mongoose;

const exerciseschema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  demo: {
    type: String
  },
  mgroup: {
    type: String
  },
  // price: {
  //   type: Number,
  //   required: true,
  //   min: 0.99
  // },
  quantity: {
    type: Number,
    min: 0,
    default: 0
  },
  reps: {
    type: Number,
    min: 0,
    default: 0
  },
  weight: {
    type: Number,
    min: 0,
    default: 0
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
});

const Exercise = mongoose.model('Exercise', exerciseschema);

module.exports = Exercise;