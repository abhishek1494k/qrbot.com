const mongoose=require("mongoose");

const BlacklistuserSchema=mongoose.Schema({
    block_email:String,
    name:String,
    password:String,
    block_userId:String
},{
    versionKey:false
});

const BlacklistuserModel=mongoose.model("Blacklistuser",BlacklistuserSchema);

module.exports={
    BlacklistuserModel
}