const db = require('../database');
const generateResponseObject = require('../lib/generateResponseObject');
const createHash = require('../lib/hash');
const validate = require('../lib/validator');
const configs = require('../configs');
require('../schemas/user');

class AuthModel {
  constructor() {
    this.Users = db.model('users');
  }

  async login(userData){
    if(!validate(userData).success){
      return generateResponseObject(false, validate(userData).message, null);
    }
    try {
      let user = await this.Users.findOne({email: userData.email});
      let password = createHash(userData.password, configs.PASSWORD_SALT);
      if(!user || user.password !== password){
        return generateResponseObject(false, "Email or password is incorect", null);
      }
      return generateResponseObject(true, null, {
        id: user._id,
        email: user.email,
        role: user.role
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // async register(userData){
  //   if(!validate(userData).success){
  //     return generateResponseObject(false, validate(userData).message, null);
  //   }
  //
  //   try {
  //     let existsUser = await this.Users.findOne({ email: userData.username });
  //     if(existsUser !== null){
  //       return generateResponseObject(false, "Email already exists", null);
  //     }
  //
  //     let user = await this.Users.create({
  //       email: userData.username,
  //       password: createHash(userData.password, configs.PASSWORD_SALT),
  //       fullName: userData.fullName,
  //       role: 'student'
  //     });
  //
  //     return generateResponseObject(true, null, {
  //       id: user._id,
  //       email: user.email
  //     });
  //   } catch (error) {
  //     throw new Error(error.message);
  //   }
  // }

  // async loginWithGoogle(googleProfile){
  //   try {
  //     let user = await this.Users.findOne({ googleId: googleProfile.id });
  //     if(user !== null){
  //       return generateResponseObject(true, null, {
  //         id: user._id,
  //         email: user.email
  //       });
  //     }
  //
  //     let newUser = await this.Users.create({
  //       email: googleProfile.emails[0].value,
  //       fullName: googleProfile.displayName,
  //       googleId: googleProfile.id,
  //       role: 'student'
  //     });
  //     return generateResponseObject(true, null, {
  //       id: newUser._id,
  //       email: newUser.email
  //     });
  //   } catch (error) {
  //     throw new Error(error.message);
  //   }
  // }
}

module.exports = new AuthModel();
