const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  description: String,
  hours: {
    type: Number,
    default: 0
  },
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
  }
});

module.exports = mongoose.model('tasks', TaskSchema);
