const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const fs = require('fs');
const path = require('path');
const usersUrl = path.resolve(__dirname, '../db/users/users.json');

const verifyPassword = (user, password) => {
  return user.password === password
}

passport.use('local', new localStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, 
(username, password, done) => {
console.log('auth login')
  const db = require('../db/users/users.json');
  const user = db.find((item) => item.email === username.toLowerCase());

  if(!user) { return done(null, false) }
  if (!verifyPassword(user, password)) {
    return done(null, false)
   }

  return done(null, user) 
}))

passport.use('register', new localStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback : true
},
(req, username, password, done) => {
console.log('auth register')
console.log(req.body)
  let db = require('../db/users/users.json');
  let user = db.find((item) => item.email === username);

  if (user) {
    console.log('User already exists');
    return done(null, false);
  } else {
    let { login = '', name = '', avatar = '' } = req.body;
    if(avatar === '') { avatar = 'https://cdn1.iconfinder.com/data/icons/rcons-user-action/512/user-1024.png'}
    user = {id: String(db.length + 1), email: username.toLowerCase(), userName: name, userLogin: login, password, avatar};
    db.push(user)

    fs.writeFile(usersUrl, JSON.stringify(db, null, 2), (err) => { 
      console.log('Начали запись')
      if (err) {
        console.error(err);
        throw err; 
      } 
    }); 
  }
  console.log('User Registration succesful');    
  return done(null, user);
})
);




passport.serializeUser((user, cb) => {
  console.log('seril')
  console.log(user)
  cb(null, user.id);
})

passport.deserializeUser((id, cb) => {
  console.log('deseril')
  console.log(id)
  const db = require('../db/users/users.json')
  const user = db.find((item) => item.id === id);
  if(!user) { return cb('err') };
  cb(null, user);
});




module.exports = passport