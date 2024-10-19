const userModel = require("../models/userschema");
const bcrypt = require("bcrypt");

module.exports.EsmFonction = async (req, res) => {
  try {
    //ligne 1 //ligne 2 //ligne ...
    res.status(200).json("");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getAllUsers = async (req, res) => {
  try {
    const usersList = await userModel.find(); //GetAllUsers
    res.status(200).json({ usersList });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.deleteUserByID = async (req, res) => {
  try {
    const { id } = req.params;                                //njibo id user
    const chekIfUserExists = await userModel.findById(id);    // verification   
    if (!chekIfUserExists) {                                  
      throw new Error("user not found");                        // personalisation error
    }
    await userModel.findByIdAndDelete(id);                    //Find ba3ed delete user
    res.status(200).json("deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.addUser = async (req, res) => {
  try {
    const { email, password, nom, prenom } = req.body;    //njibo data user
    console.log(req.body.password);     
    const user = new userModel({ email, password, nom, prenom });   //
    const useradded = await user.save();                              //save user
    res.status(200).json({ useradded });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    const { email, nom, prenom } = req.body;                 //njibo data user
    const { id } = req.params;
    const chekIfUserExists = await userModel.findById(id);    // verification 
    if (!chekIfUserExists) {
      throw new Error("user not found");                      //personalisation erreur
    }
    const updates = await userModel.findByIdAndUpdate(id, {     //update user
      $set: { email, nom, prenom },
    });
    res.status(200).json("useradded");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getUserById = async (req, res) => {
try {
    const userId = req.params.id;     //req.params unique ll ID
    const user = await userModel.findById(userId);
    if (!user) {
        return res.status(400).json("not found")
    }
    res.status(200).json({user})
} catch (error) {
    res.status(500).json({ message: error.message });
}
}

module.exports.confirmPassword = async (req, res) => {
  try {
    const { password1, password2 } = req.body;
    console.log(req.body.password1);
    console.log(req.body.password2);
    const compare = await bcrypt.compare(password1, password2);
    res.status(200).json({ compare });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// module.exports.hello = (req,res) => {
//     res.status(200).json("marahbe bikom")
// }

module.exports.addUserWithImg = async (req, res) => {
  try {
    const { filename } = req.file; //zyeda 1
    const { email, password, nom, prenom } = req.body;    //njibo data user
    console.log(req.body.password);     
    const user = new userModel({ email, password, nom, prenom , image_User : filename });   //zyeda 2 image_User : filename
    const useradded = await user.save();                              //save user
    res.status(200).json({ useradded });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
