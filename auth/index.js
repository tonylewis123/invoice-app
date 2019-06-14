const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const AuthModel = require('../models/AuthModel');
const UserModel = require('../models/UserModel');
const configs = require('../configs');

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use('loginUsers', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  }, async (req, email, password, done) => {
    try {
      let response = await AuthModel.login({email, password});
      if(response.success){
        done(null, response.data);
      } else {
        done(null, false, response.error);
      }
    } catch (error) {
        done(error.message);
    }
  }));

  passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : configs.JWT.SECRET
    },
    async (jwtPayload, done) => {
      try {
        let response = await UserModel.getUserById(jwtPayload.id);
        if(response.success){
          done(null, response.data);
        } else {
          done(null, false, response.error);
        }
      } catch (error) {
        done(error.message);
      }
    }
  ));

  // passport.use('registerUsers', new LocalStrategy({
  //   usernameField : 'username',
  //   passwordField : 'password',
  //   passReqToCallback : true
  // }, async (req, username, password, done) => {
  //   try {
  //     let response = await AuthModel.register(req.body);
  //     if(response.success){
  //       done(null, response.data);
  //     } else {
  //       done(null, false, response.error);
  //     }
  //   } catch (error) {
  //     done(error.message);
  //   }
  // }));
};
