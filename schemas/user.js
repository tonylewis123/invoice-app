const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  password: String,
  email: {
    type: String,
    unique: true
  },
  fullName: {
    type: String,
    default: "Name Surname"
  },
  projects: [{
    type: Schema.Types.ObjectId,
    ref: 'projects'
  }],
  role: {
    type: String,
    enums: [ 'employee', 'admin', 'superadmin' ]
  }
});

module.exports = mongoose.model('users', UserSchema);
