const moment = require('moment');
const db = require('../database');
const generateResponseObject = require('../lib/generateResponseObject');
const validate = require('../lib/validator');
require('../schemas/project');

class ProjectModel {
  constructor() {
    this.Projects = db.model('projects');
  }

  async create(creatorId, projectData){
    try {
      let project = await this.Projects.create({
        name: projectData.name,
        description: projectData.description,
        created_at: moment(projectData.date).format("L"),
        author: creatorId
      });
      return project;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new ProjectModel();
