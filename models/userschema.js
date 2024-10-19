const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  email: {type : String , required: true , unique: true},
  password: {type : String , required: true},
  role: { type: String, enum: ["admin", "moderateur", "client"] },
  nom: String,
  prenom: String,
  age: Number,
  address: String,
  image_User : String,
  createdAt : Date 
//   image_User : {type : String , required: true , Default:"client.png"}
});

userSchema.post("save",function (req,res,next){
    console.log("new user was created & saved successfully");
    next();
})

userSchema.pre("save", async function (next) {
try {
    const salt = await bcrypt.genSalt();
    const user = this;
    console.log(user.password);
    user.password = await bcrypt.hash(user.password, salt);
    // user.image_User = "client.png"
    user.createdAt = Date.now();
    next();
} catch (error) {
    next(error);
}
})

const User = mongoose.model("User", userSchema);
module.exports = User;