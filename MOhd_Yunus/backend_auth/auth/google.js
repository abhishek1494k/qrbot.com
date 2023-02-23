var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const passport=require("passport")
const express=require("express");
const googleRouter=express.Router();
require('dotenv').config();






passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5500/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(null,profile);
    // });
  }
));

googleRouter.get("/home",(req,res)=>{
    res.send("homepage")
});
googleRouter.get("/google",(req,res)=>{
    res.send("logged in")
});
googleRouter.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

googleRouter.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login',session:false }),
  function(req, res) {
    console.log(req);
    // Successful authentication, redirect home.
    res.redirect('/');
  });

module.exports={
    googleRouter
}








