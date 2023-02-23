const mongoose=require("mongoose");

const qrSchema=mongoose.Schema({
    text:String,
    size:Number,
    userID:String,
});

const QRModel=mongoose.model("qr",qrSchema);

module.exports={
    QRModel
}