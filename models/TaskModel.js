const db = require('../database');
const generateResponseObject = require('../lib/generateResponseObject');
const validate = require('../lib/validator');
require('../schemas/task');

class TaskModel {
  constructor() {
    this.Projects = db.model('tasks');
  }

  async create(taskData){
    try {

    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new TaskModel();
