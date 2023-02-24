const mongoose=require("mongoose");

const qrSchema=mongoose.Schema({
    url:String,
    size:Number,
    email:String,
});

const QRModel=mongoose.model("qr",qrSchema);

module.exports={
    QRModel
}