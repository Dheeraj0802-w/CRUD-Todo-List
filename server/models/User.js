const mongoose = require('mongoose');

//create Schema
const UserSchema = new mongoose.Schema({
        name:String,
        email: String,
        password: String,
        role: {
            type : String,
            default: "visitor"
      }
})
const UseModel = mongoose.model("users",UserSchema) 
module.exports=UseModel