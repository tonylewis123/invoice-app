const moment = require('moment');
const db = require('../database');
const generateResponseObject = require('../lib/generateResponseObject');
const validate = require('../lib/validator');
const projectIdGenerator = require('../lib/projectIdGenerator');
require('../schemas/project');

class ProjectModel {
  constructor() {
    this.Projects = db.model('projects');
  }

  async create(creatorId, projectData){
    try {
      let lastProject = await this.Projects.find().sort({projectId: -1}).limit(1);
      let project = await this.Projects.create({
        name: projectData.name,
        description: projectData.description,
        created_at: moment(projectData.date).format("L"),
        author: creatorId,
        projectId: projectIdGenerator("AAA", lastProject[0])
      });
      return project;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getProjectById(id){
    try {
      let project = await this.Projects.findById(id)
          .populate('tasks')
          .exec();
      if(project === null){
        return generateResponseObject(false, "Project does not exists!", null);
      }
      return generateResponseObject(true, null, project);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAllProjects(){
    try {
      let projects = await this.Projects.find()
          .populate('tasks')
          .exec();

      return generateResponseObject(true, null, projects);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new ProjectModel();
