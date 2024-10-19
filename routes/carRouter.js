var express = require('express');
var router = express.Router();
const carController = require('../controller/carController.js');

/* GET users  */
router.get('/getAllCars',carController.getAllCars);
router.get('/getCarById/:id',carController.getCarById);
router.post('/addCar',carController.addCar);
router.post('/VendreCar',carController.affectCarToUser);
router.post('/desaffectCarToUser',carController.desaffectCarToUser);
router.put('/updateCar/:id',carController.updateCar);
router.delete('/deleteCarByID/:id',carController.deleteCarByID);

module.exports = router;
