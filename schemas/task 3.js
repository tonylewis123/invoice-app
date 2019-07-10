const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  name: String,
  description: String,
  hours: {
    type: Number,
    default: 0
  },
  taskDate: Date,
  created_at: {
    type: Date,
    default: new Date()
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'projects'
  },
  expenses: []
});

module.exports = mongoose.model('tasks', TaskSchema);
