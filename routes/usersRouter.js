var express = require('express');
var router = express.Router();
const userController = require('../controller/userController.js');
const uploadFile = require('../middlewares/uploadFile.js');
  
/* GET users  */
router.get('/getAllUsers',userController.getAllUsers);
router.delete('/deleteUserByID/:id',userController.deleteUserByID);
router.post('/addUser',userController.addUser);
router.post('/addUserWithImg', uploadFile.single("image_User") ,userController.addUserWithImg);
router.post('/confirmPassword',userController.confirmPassword);
router.put('/updateUser/:id',userController.updateUser);
router.get('/getUserById/:id',userController.getUserById);
module.exports = router;
