const jwt=require('jsonwebtoken');
require('dotenv').config();

const adminAuthentication=(req,res,next)=>{
    var token=req.headers.authorization;

    try{
        var decoded=jwt.verify(token,process.env.token_secret);
        if(decoded && decoded.email=='admin@gmail.com'){
            req.body.userID=decoded.dataid;
            // req.body.email=decoded.email;
            next()
        }else{
            res.send({"msg":"you are not admin"});
        }
    }catch(e){
        console.log('ERROR at 16 MW',e);
    }

};

module.exports={
    adminAuthentication
}