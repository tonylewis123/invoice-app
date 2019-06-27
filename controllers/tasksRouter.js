const express = require('express');
const router = express.Router();
const generateResponseObject = require('../lib/generateResponseObject');
const { isSuperadmin, isAdmin, isEmployee } = require('../lib/checkRoles');

const TasksModel = require('../models/TasksModel');

router.post('/', async (req, res) => {
  try {
    let result = await TasksModel.create(req.user.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(generateResponseObject(false, error.message, null));
  }
});

module.exports = router;
