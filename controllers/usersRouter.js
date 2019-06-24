const express = require('express');
const router = express.Router();
const generateResponseObject = require('../lib/generateResponseObject');
const { isSuperadmin, isAdmin, isEmployee } = require('../lib/checkRoles');

const UserModel = require('../models/UserModel');

router.post('/createProject', isAdmin, async (req, res) => {
  try {
    let result = await UserModel.createProject(req.user.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(generateResponseObject(false, error.message, null));
  }
});

router.get('/:id', async (req, res) => {
  console.log(req.user);
  try {
    let result = await UserModel.getUserById(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(generateResponseObject(false, error.message, null));
  }
});

module.exports = router;
