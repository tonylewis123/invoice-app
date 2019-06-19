const db = require('../database');
const generateResponseObject = require('../lib/generateResponseObject');
const generateRandomPassword = require('../lib/generateRandomPassword');
const validate = require('../lib/validator');
const createHash = require('../lib/hash');
const configs = require('../configs');
require('../schemas/user');

class UserModel {
  constructor() {
    this.Users = db.model('users');
  }

  async create(userData){
    if(!validate(userData).success){
      return generateResponseObject(false, validate(userData).message, null);
    }

    try {
      let existsUser = await this.Users.findOne({ email: userData.email });
      if(existsUser !== null){
        return generateResponseObject(false, "Email already exists", null);
      }
      let randomPassword = generateRandomPassword(userData.fullName, 8);

      let user = await this.Users.create({
        email: userData.email,
        password: createHash(randomPassword, configs.PASSWORD_SALT),
        fullName: userData.fullName,
        role: userData.role
      });

      return generateResponseObject(true, null, {
        id: user._id,
        email: user.email,
        password: user.password
      });
    } catch (error) {
      throw new Error(error.message);
    }
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

  async getAllUsers(){
    try {
      let users = await this.Users.find({ role: {$ne: 'superadmin'} });
      return generateResponseObject(true, null, users);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new UserModel();
