module.exports = (data, length) => {
  var result = '';
  var characters = data.split(' ')[0] + Date.now();
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
