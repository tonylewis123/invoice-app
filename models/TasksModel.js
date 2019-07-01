const db = require('../database');
const generateResponseObject = require('../lib/generateResponseObject');
const validate = require('../lib/validator');
const isObjectId = require('../lib/isObjectId');
require('../schemas/task');

class TasksModel {
  constructor() {
    this.Tasks = db.model('tasks');
    this.Projects = db.model('projects');
  }

  async create(creatorId, taskData) {
    try {
      let task = await this.Tasks.create({
        taskDate: taskData.taskDate,
        hours: taskData.hours,
        description: taskData.description,
        author: creatorId,
        project: taskData.projectId
      });

      let project = await this.Projects.findOne({_id: taskData.projectId});
      if(project === null){
        return generateResponseObject(false, "Project does not found", null);
      }
      project.tasks.push(task._id);
      await project.save();

      if(taskData.expenses.length){
        taskData.expenses.forEach(expense => {
          task.expenses.push({
            supplier: expense.supplier,
            materialsCost: expense.materialsCost,
            materialsDescription: expense.materialsDescription,
            taskId: task._id
          });
        })
      }
      let updatedTask = await task.save();
      return generateResponseObject(true, null, updatedTask);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getTaskById(id){
    if(!isObjectId(id)){
      return generateResponseObject(false, "Please send valid Object Id", null);
    }
    try {
      let task = await this.Tasks.findById(id);
      if(task == null){
        return generateResponseObject(false, "Task does not exists!", null);
      }
      return generateResponseObject(true, null, task);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new TasksModel();
