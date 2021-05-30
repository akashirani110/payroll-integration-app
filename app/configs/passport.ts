import { IUser, EmployerUser } from './../models/user.model';
import passport from 'passport'
const LocalStrategy = require('passport-local');
import userManager from '../db-manager/user.manager';

passport.use(new LocalStrategy({
  usernameField: 'user[email]',
  passwordField: 'user[password]',
}, async(email, password, done) => {
  // Find email with case insensitive
 try{
  await userManager.getUserByEmail(email.toLowerCase(), async(err, user) => {
    if (!user[0]) {
      return done(null, false, { message: 'Cannot find this email', isInvalidUsername: true });
    }
    else{
      user = new EmployerUser({employer_user_id: user[0].employer_user_id,
        firstName: user[0].first_name,
        lastName: user[0].last_name,
        position: user[0].position,
        email: user[0].email,
        password: null,
        salt: user[0].salt,
        hashedPassword: user[0].hashed_password,
      });

      if (!user.validatePassword(password)) {
        return done(null, false, { message: 'Incorrect password', isInvalidPassword: true });
      }
      else{
        return done(null, user);
      }
    }
  });
}
catch(err){
  console.log(err);
}
}));