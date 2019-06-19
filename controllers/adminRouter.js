const express = require('express');
const router = express.Router();
const generateResponseObject = require('../lib/generateResponseObject');

const UserModel = require('../models/UserModel');

router.post('/create_user', async (req, res) => {
  try {
    let result = await UserModel.create(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(generateResponseObject(false, error.message, null));
  }
});

router.get('/usersList', async (req, res) => {
  try {
    let result = await UserModel.getAllUsers();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(generateResponseObject(false, error.message, null));
  }
});

router.delete('/delete_user', async (req, res) => {
  try {
    if(req.user.id.equals(req.body.userId)) {
      return res.status(400).json(generateResponseObject(false, "Can not delete yourself", null));
    }
    let result = await UserModel.delete(req.body.userId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(generateResponseObject(false, error.message, null));
  }
});

module.exports = router;
