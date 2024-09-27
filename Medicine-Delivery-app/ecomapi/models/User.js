const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
    name:{type:String,required:true},
    username:{type:String ,required:true,unique:true},
    email:{type:String, required:true,unique:true},
    password:{type:String,required:true},
    isAdmin:{
        type:Boolean,
    },
},
{timestamps:true}
);

module.exports = mongoose.model("User", UserSchema)