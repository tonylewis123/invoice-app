const isAuthenticate = require('../lib/isAuthenticate');
const authRouter = require('../auth/authRouter');
const adminRouter = require('./adminRouter');
const usersRouter = require('./usersRouter');

class Api {
  initializeApp(app){
    app.use('/api/auth', authRouter);
    app.use('/api/admin', isAuthenticate, adminRouter);
    app.use('/api/users', isAuthenticate, usersRouter);
  }
}

module.exports = new Api();
