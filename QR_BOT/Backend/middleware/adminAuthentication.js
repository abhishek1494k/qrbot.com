const jwt=require('jsonwebtoken');
require('dotenv').config();

const adminAuthentication=(req,res,next)=>{
    var token=req.headers.authorization;
    try{
        var decoded=jwt.verify(token,process.env.token_secret);
        if(decoded && decoded.email==='admin@gmail.com'){
            req.body.userID=decoded.userID;
            next()
        }else{
            res.send({"msg":"You are not admin"});
        }
    }catch(e){
        console.log('ERROR at 16 MW',e);
        res.send({"msg":"You are not admin"});
    }

};

module.exports={
    adminAuthentication
}