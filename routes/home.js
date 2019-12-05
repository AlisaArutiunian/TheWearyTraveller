const express = require('express')
const router = express.Router();
const RoomInfo = require('../models/room');

router.get("/",(req,res)=> 
{

  RoomInfo.find().distinct('location', function(error, results) {
    // ids is an array of all ObjectIds

    res.render("home", {
      locations: results
    });

  });


});

router.post("/",(req,res)=> 
{

if(req.body.location)
{
    res.redirect(encodeURI(`/roomListing?location=${req.body.location}`));
} else{

  res.redirect(`/roomListing`);
}


});


module.exports=router;