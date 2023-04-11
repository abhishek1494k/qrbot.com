const express=require('express')
const app=express();
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.send({ msg: "Enter Token First" });
    } else {
      try {
        const decoded = jwt.verify(token, process.env.token_secret);
        console.log(token)
        if (decoded) {
          const userID = decoded.userID;
          const email = decoded.email;
          // console.log('Middleware Console',userID,email)
          req.body.userID = userID;
          req.body.email = email;
          next();
        } else {
          res.send({ msg: "Wrong Token" });
        }
      } catch (e) {
        res.send({ msg: "Token Expired" });
      }
    }
  };
  
  module.exports = {
    authenticate
  };