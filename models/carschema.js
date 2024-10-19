const mongoose = require("mongoose");
const carSchema = new mongoose.Schema({
    brand : String , 
    model : String , 
    year : {type : Number , required : true },
    owner :{type: mongoose.Schema.Types.ObjectId,ref:'User'}   //one
    //barcha : [{type: mongoose.Schema.Types.objectId,ref:'User'}], //many
})

const Car = mongoose.model('Car',carSchema);
module.exports = Car;