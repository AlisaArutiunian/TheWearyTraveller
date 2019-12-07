const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const UserInfo = require('../models/userInfo');
const BookedRooms = require('../models/bookedRooms');



router.get("/",auth,(req,res)=>
{
/*
    UserRooms
      .find({user: req.session.user._id})
      .populate('room')
      .then((rooms) => {
        res.render('booked', {
          title: 'booked',
          rooms: rooms,
        });
      })
      .catch((err) => {
        console.log(`Error : ${err}`);
        res.render('error', {
          message: 'Something went wrong! :(',
          error: err,
        });
      });*/

    //res.render("RegUser/userDashboard");
    BookedRooms
      .find({userInfo: req.session.userInfo._id})
      .populate('roomInfo')
      .then((bookedRooms) => {
          console.log('Booked: ', bookedRooms);
          res.render('RegUser/userDashboard', {
              rooms: bookedRooms
              
          })
        //console.log('User: ', user);  
        /*for (let room of user.bookedRooms) {
              console.log('room: ', room);
          }*/

         // res.render("RegUser/userDashboard");
        /*res.render('booked', {
          title: 'booked',
          rooms: rooms,
        });*/
      })
      .catch((err) => {
        console.log(`Error : ${err}`);
        /*res.render('error', {
          message: 'Something went wrong! :(',
          error: err,
        });*/
      });

});

module.exports=router;