const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const configs = require('../configs');
const generateResponseObject = require('../lib/generateResponseObject');

// router.post('/register', async (req, res, next) => {
//   passport.authenticate('registerUsers', { session: false }, (err, user, info) => {
//     if (err) {
//       return next(err)
//     }
//     if (!user) {
//       return res.status(200).send(JSON.stringify(generateResponseObject(false, info, null)));
//     }
//     req.logIn(user, { session: false }, err => {
//       if (err) {
//         return next(err);
//       }
//       return res.status(200).send(JSON.stringify(generateResponseObject(true, null, user)));
//     });
//   })(req, res, next);
// });

router.post('/login', (req, res, next) => {
  passport.authenticate('loginUsers', { session: false }, (err, user, info) => {
    if (err) {
      return next(err)
    }
    if (!user) {
      return res.status(200).send(JSON.stringify(generateResponseObject(false, info, null)));
    }

    req.logIn(user, { session: false }, err => {
      if (err) {
        return next(err);
      }
      const token = jwt.sign(user, configs.JWT.SECRET, { expiresIn: '60s' });
      return res.status(200).json(generateResponseObject(true, null, Object.assign(user, { token })));
    });
  })(req, res, next);
});

module.exports = router;
