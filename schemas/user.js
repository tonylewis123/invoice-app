const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  password: String,
  username: {
    type: String,
    unique: true
  },
  fullName: {
    type: String,
    default: "Name Surname"
  },
  paidForEvents: {
    type: Number,
    default: 0
  },
  role: {
    type: String,
    enums: [ 'employer', 'admin', 'superadmin' ],
    default: 'employer'
  }
});

module.exports = mongoose.model('users', UserSchema);
