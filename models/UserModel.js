const db = require('../database');
const generateResponseObject = require('../lib/generateResponseObject');
const validate = require('../lib/validator');
require('../schemas/user');

class UserModel {
  constructor() {
    this.Users = db.model('users');
  }

  async getUserById(id){
    try {
      let user = await this.Users.findOne({_id: id}).select('-password');
      if(user === null){
        return generateResponseObject(false, 'User does not exists', null);
      }
      return generateResponseObject(true, null, user);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new UserModel();
