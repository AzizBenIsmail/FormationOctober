var express = require('express');
var router = express.Router();
const user = require('../controller/userController.js');

/* GET users listing. */
router.get('/nour',user.hello);

router.get('/', function(req, res, next) {
    res.status(200).json('index', { title: 'Express' });
  });
  
module.exports = router;
