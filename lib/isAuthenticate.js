const passport = require('passport');
const generateResponseObject = require('./generateResponseObject');

module.exports = (req, res, next) => {
  passport.authenticate('jwt', {session: false}, (err, user, info) => {
    if(err){
      return res.status(401).json(generateResponseObject(false, err.message, null));
    }
    if(info){
      return res.status(401).json(generateResponseObject(false, info.message, null));
    }
    req.user = {
      id: user._id,
      email: user.email,
      role: user.role
    };
    next();
  })(req, res, next);
};
