exports.isSuperadmin = (req, res, next) => {
  if(req.user.role !== 'superadmin'){
    return res.status(401).json(generateResponseObject(false, "Permission denied", null));
  }
  next();
}

exports.isAdmin = (req, res, next) => {
  if(req.user.role !== 'admin'){
    return res.status(401).json(generateResponseObject(false, "Permission denied", null));
  }
  next();
}

exports.isEmployer = (req, res, next) => {
  if(req.user.role !== 'employer'){
    return res.status(401).json(generateResponseObject(false, "Permission denied", null));
  }
  next();
}
