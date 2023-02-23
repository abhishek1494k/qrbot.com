// const passport = require('passport');
// const FacebookStrategy = require('passport-facebook').Strategy;
// const express = require('express');
// const session=require("express-session")
// // const User = require('../dal/models/user.model');
// app.use(
//   session({
//     resave: false,
//     saveUninitialized: true,
//     secret: "SECRET",
//   })
// );

// app.use(passport.initialize());
// app.use(passport.session());

// passport.serializeUser(function (user, cb) {
//   cb(null, user);
// });
// passport.deserializeUser(function (obj, cb) {
//   cb(null, obj);
// });
// const fbRouter = express.Router();
// require('dotenv').config();

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.fb_app_id,
//       clientSecret: process.env.fb_app_secret,
//       callbackURL: process.env.fb_callback_url,
//     },
//     async function (accessToken, refreshToken, profile, cb) {
//     //   const user = await User.findOne({
//     //     accountId: profile.id,
//     //     provider: 'facebook',
//     //   });
//     //   if (!user) {
//         console.log('Adding new facebook user to DB..');
//         // const user = new User({
//         //   accountId: profile.id,
//         //   name: profile.displayName,
//         //   provider: profile.provider,
//         // });
//         // await user.save();
//         // console.log(user);
//         console.log(profile);
//         return cb(null, profile);
//     //   } else {
//     //     console.log('Facebook User already exist in DB..');
//     //     // console.log(profile);
//     //     return cb(null, profile);
//     //   }
//     }
//   )
// );

// fbRouter.get('/', passport.authenticate('facebook', { scope: 'email' }));

// fbRouter.get(
//   '/callback',
//   passport.authenticate('facebook', {
//     failureRedirect: '/auth/facebook/error',
//   }),
//   function (req, res) {
//     // Successful authentication, redirect to success screen.
//     res.redirect('/auth/facebook/success');
//   }
// );

// fbRouter.get('/success', async (req, res) => {
//     console.log(req);
//   const userInfo = {
//     id: req.session.passport.user.id,
//     displayName: req.session.passport.user.displayName,
//     provider: req.session.passport.user.provider,
//   };
//   res.render('fb-github-success', { user: userInfo });
// });

// fbRouter.get('/error', (req, res) => res.send('Error logging in via Facebook..'));

// fbRouter.get('/signout', (req, res) => {
//   try {
//     req.session.destroy(function (err) {
//       console.log('session destroyed.');
//     });
//     res.render('auth');
//   } catch (err) {
//     res.status(400).send({ message: 'Failed to sign out fb user' });
//   }
// });

// module.exports = {fbRouter};
