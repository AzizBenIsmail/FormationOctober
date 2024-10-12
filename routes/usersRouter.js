var express = require('express');
var router = express.Router();
const userController = require('../controller/userController.js');

/* GET users listing. */
// router.get('/hello',userController.hello);

// router.get('/', function(req, res, next) {
//     res.status(200).json('index', { title: 'Express' });
//   });
  
/* GET users  */
router.get('/getAllUsers',userController.getAllUsers);
router.delete('/deleteUserByID/:id',userController.deleteUserByID);
router.post('/addUser',userController.addUser);
router.post('/confirmPassword',userController.confirmPassword);
router.put('/updateUser/:id',userController.updateUser);
router.get('/getUserById/:id',userController.getUserById);
module.exports = router;
