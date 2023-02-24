const mongoose=require("mongoose");

const qrSchema=mongoose.Schema({
    url:String,
    size:Number,
    email:String,
},{
    versionKey:false
});

const QRModel=mongoose.model("qr",qrSchema);

module.exports={
    QRModel
}