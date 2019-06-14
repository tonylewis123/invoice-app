const validator = require('validator');

function generateValidationResponse(success, message){
  return { success, message }
}

module.exports = data => {
  if(data.username != undefined && (!data.username || !validator.isEmail(data.username))){
    return generateValidationResponse(false, 'Please enter valid email!');
  }
  if(data.email != undefined && (!data.email || !validator.isEmail(data.email))){
    return generateValidationResponse(false, 'Please enter valid email!');
  }
  if(data.password != undefined && (!data.password || !validator.isLength(data.password, 6, 30))){
    return generateValidationResponse(false, 'Password length must be 6-30 character!');
  }
  return generateValidationResponse(true, null);
}
