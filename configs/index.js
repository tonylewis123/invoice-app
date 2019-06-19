module.exports = {
  DOMAIN: process.env.NODE_ENV === 'production' ? "" : 'http://localhost:3000',
  HOST_NAME: 'localhost',
  NODE_PORT: process.env.PORT || 3000,
  PASSWORD_SALT: "inv0_4%@$#oic-=)e",
  DB_SETTINGS: {
    HOST : 'localhost',
    PORT : 27017,
    NAME : 'INVOICE'
  },
  PRODUCTION_DB_SETTINGS: {
    USERNAME : 'invoice',
    PASSWORD : 'invoice123',
    NAME : 'invoice'
  },
  JWT: {
    SECRET: 'your_jwt_secret'
  },
  SMTP_PARAMS: {
    service : 'Gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    tls: {
      rejectUnauthorized: true
    },
    auth: {
      user: "tonybomer11@gmail.com",
      pass: "davmark11"
    }
  },
  APP_EMAIL: 'tonybomer11@gmail.com'
};
