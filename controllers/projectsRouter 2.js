const express = require('express');
const router = express.Router();
const generateResponseObject = require('../lib/generateResponseObject');
const { isSuperadmin, isAdmin, isEmployee } = require('../lib/checkRoles');

const ProjectModel = require('../models/ProjectModel');

router.get('/:id', async (req, res) => {
  try {
    let result = await ProjectModel.getProjectById(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(generateResponseObject(false, error.message, null));
  }
});

module.exports = router;
