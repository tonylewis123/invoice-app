const ProjectModel = require('./ProjectModel');
const TasksModel = require('./TasksModel');

const db = require('../database');
const generateResponseObject = require('../lib/generateResponseObject');
const generateRandomPassword = require('../lib/generateRandomPassword');
const validate = require('../lib/validator');
const createHash = require('../lib/hash');
const sendMail = require('../lib/sendMail');
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

      await sendMail({
        email: user.email,
        password: randomPassword,
        fullName: user.fullName
      });

      let users = await this.Users.find({ role: {$ne: 'superadmin'} }).select('_id fullName email role');
      return generateResponseObject(true, null, users);

    } catch (error) {
      throw new Error(error.message);
    }
  }

  async delete(userId){
    try {
      await this.Users.findByIdAndRemove(userId);
      let users = await this.Users.find({ role: {$ne: 'superadmin'} }).select('_id fullName email role');
      return generateResponseObject(true, null, users);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getUserById(id){
    try {
      let user = await this.Users.findOne({_id: id})
          .select('-password')
          .populate('projects')
          .exec();
      if(user === null){
        return generateResponseObject(false, 'User does not exists', null);
      }
      if(user.role === 'employee' || user.role === 'superadmin'){
        let projects = await ProjectModel.getAllProjects();
        return generateResponseObject(true, null, Object.assign(user, {projects: projects}));
      }
      return generateResponseObject(true, null, user);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAllUsers(){
    try {
      let users = await this.Users.find({ role: {$ne: 'superadmin'} }).select('_id fullName email role');
      return generateResponseObject(true, null, users);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createProject(creatorId, projectData){
    try {
      let creator = await this.Users.findOne({ _id: creatorId }).select('-password');
      if(creator === null){
        return generateResponseObject(false, 'User does not exists', null);
      }
      let newProject = await ProjectModel.create(creatorId, projectData);
      creator.projects.push(newProject._id);
      creator = await creator.save();
      creator = await this.Users.populate(creator, {path:"projects"});
      return generateResponseObject(true, null, creator);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new UserModel();
