const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  name: String,
  description: String,
  created_at: {
    type: Date,
    default: new Date()
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  tasks: [{
    type: Schema.Types.ObjectId,
    ref: 'tasks'
  }]
});

module.exports = mongoose.model('projects', ProjectSchema);
