const mongoose=require("mongoose");

const UserSchema=mongoose.Schema({
    name:String,
    password:String,
    email:String,
},{
    versionKey:false
});

const UserModel=mongoose.model("user",UserSchema);

module.exports={
    UserModel
}