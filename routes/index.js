const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  console.log('Главный роут')
  res.json({status: 'okdsdsds'})
});




module.exports = router;