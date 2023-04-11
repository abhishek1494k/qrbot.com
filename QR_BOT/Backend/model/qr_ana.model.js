const mongoose=require("mongoose");

const qranaSchema=mongoose.Schema({
    url:String,
    email:String,
    userID:String
},{
    versionKey:false
});

const QRAnaModel=mongoose.model("qrana",qranaSchema);

module.exports={
    QRAnaModel
}