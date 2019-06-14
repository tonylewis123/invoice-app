const express = require('express');
const router = express.Router();
const generateResponseObject = require('../lib/generateResponseObject');

const UserModel = require('../models/UserModel');

router.get('/:id', async (req, res) => {
  try {
    let result = await UserModel.getUserById(req.params.id);
    res.send(JSON.stringify(result));
  } catch (error) {
    res.send(JSON.stringify(generateResponseObject(false, error.message, null)));
  }
});

module.exports = router;
