const express = require('express');
const router = express.Router();
const generateResponseObject = require('../lib/generateResponseObject');

const UserModel = require('../models/UserModel');

router.get('/usersList', async (req, res) => {
  try {
    let result = await UserModel.getAllUsers();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(generateResponseObject(false, error.message, null));
  }
});

router.post('/create_user', async (req, res) => {
  try {
    let result = await UserModel.create(req.body);
    if(result.success){
      let allUsers = await UserModel.getAllUsers();
      return res.status(200).json(allUsers);
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(generateResponseObject(false, error.message, null));
  }
});

module.exports = router;
