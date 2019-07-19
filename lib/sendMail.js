const nodemailer = require("nodemailer");
const configs = require('../configs');

const generateSMTPParams = params => ({
  from: '"From Invoice App Customer Service" <' + params.senderEmail + '>',
  to: params.receverUser,
  subject: "QIS Signup",
  text: "Please do not reply to this message. This is an automatically generated notification.",
  html: "<html><body><h1>Dear " + params.nameOfUser +
        "</h1><p style='color:red'>Your password is " + params.passwordOfUser +
        ".</p> <p>Thank you,</p> <p>Invoice App Customer Service</p></body></html>"
});

module.exports = async user => {
  let transporter = nodemailer.createTransport(configs.SMTP_PARAMS);
  let info = await transporter.sendMail(generateSMTPParams({
    receverUser: user.email,
    senderEmail: configs.APP_EMAIL,
    nameOfUser: user.fullName,
    passwordOfUser: user.password
  }));
  return info;
};
