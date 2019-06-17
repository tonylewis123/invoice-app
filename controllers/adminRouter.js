const express = require('express');
const router = express.Router();
const generateResponseObject = require('../lib/generateResponseObject');
const { isSuperadmin } = require('../lib/checkRoles');

const UserModel = require('../models/UserModel');

router.post('/create_user', isSuperadmin, async (req, res) => {
  try {
    let result = await UserModel.create(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(generateResponseObject(false, error.message, null));
  }
});

module.exports = router;
