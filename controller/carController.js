const carModel = require("../models/carschema");
const userModel = require("../models/userschema");

module.exports.getAllCars = async (req, res) => {
  try {
    const CarsList = await carModel.find(); //GetAllUsers
    res.status(200).json({ CarsList });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getCarById = async (req, res) => {
  try {
    const carId = req.params.id;
    const car = await carModel.findById(carId);
    if (!carModel) {
      return res.status(400).json("not found");
    }
    res.status(200).json({ car });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.addCar = async (req, res) => {
  try {
    const { brand, model, year } = req.body; //njibo data user
    const car = new carModel({ brand, model, year }); //
    const caradded = await car.save(); //save user
    res.status(200).json({ caradded });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.affectCarToUser = async (req, res) => {
  try {
    const { IdCar, IdOwner } = req.body; //njibo data user
    await carModel.findByIdAndUpdate(IdCar,{ $set : { owner : IdOwner }});
    await userModel.findByIdAndUpdate(IdOwner, {
      $push: { cars: IdCar },
    });
    res.status(200).json("VendreCar" );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports.desaffectCarToUser = async (req, res) => {
    try {
      const { IdCar, IdOwner } = req.body; //njibo data user
      await carModel.findByIdAndUpdate(IdCar,{ $unset : { owner : "" }});
      await userModel.findByIdAndUpdate(IdOwner, {
        $pull: { cars: IdCar },
      });
      res.status(200).json("desaffectCarToUser" );
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// module.exports.addCar = async (req, res) => {
//   try {
//     const { brand, model, year, IdOwner } = req.body; //njibo data user
//     const car = new carModel({ brand, model, year, owner: IdOwner }); //
//     const caradded = await car.save(); //save user

//     await userModel.findByIdAndUpdate(IdOwner, { $push: { cars: caradded.id}});
//     res.status(200).json({ caradded });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

module.exports.updateCar = async (req, res) => {
  try {
    const { brand, model, year } = req.body; //njibo data user
    const { id } = req.params;
    const chekIfCarExists = await carModel.findById(id); // verification
    if (!chekIfCarExists) {
      throw new Error("Car not found"); //personalisation erreur
    }
    const updatesCar = await carModel.findByIdAndUpdate(id, {
      //update user
      $set: { brand, model, year },
    });
    res.status(200).json("carUpdated");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.deleteCarByID = async (req, res) => {
  try {
    const { id } = req.params; //njibo id car
    //const {idOwner } = req.body; // facon simple
    const chekIfCarExists = await carModel.findById(id); // verification
    if (!chekIfCarExists) {
      throw new Error("car not found"); // personalisation error
    }
    
    await carModel.findByIdAndDelete(id); //Find ba3ed delete user

    //await userModel.updateOne({idOwner},{$pull : {cars : id} })  // one to one // one to many 

    await userModel.updateMany({},{$pull : {cars : id} })  // Many to many // many to one // one to many // one to one
//hethy ahsen wahda 

    res.status(200).json("deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
