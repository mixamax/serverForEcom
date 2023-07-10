const express = require('express');
const router = express.Router();
const passport = require('../auth/user');

router.get('/', (req, res) => {
  // const dbUsers = require('../db/users/users.json')
    res.json({status: 'ok', users: 'user'})
});


router.get('/:id', (req, res) => {
  console.log('get id')
  const { id } = req.params;
  const dbUsers = require('../db/users/users.json')

  const user = dbUsers.find((item) => item.id === id);

  user
    ? res.json({status: 'ok', user})
    : res.json({status: 'error', message: 'user not found'})
});



router.post('/login', 
 passport.authenticate('local', { failureRedirect: '', failureMessage: true }),
(req, res) => {
  console.log('Авторизация')
  console.log(req.user)
  req.user
    ? res.json({status: 'ok', user: req.user})
    : res.json({status: 'error', message: 'user not found'})
  
})

router.post('/register',
passport.authenticate('register', { failureRedirect: '', failureMessage: true }),
(req, res) => {

  console.log('Регистрация')
  console.log(req.user)
  req.user
    ? res.json({status: 'ok', user: req.user})
    : res.json({status: 'error', message: 'error register'})
})

module.exports = router;