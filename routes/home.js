const express = require('express')
const router = express.Router();
const RoomInfo = require('../models/room');

router.get("/",(req,res)=> 
{

  RoomInfo.find().distinct('location', function(error, results) {
    // ids is an array of all ObjectIds

    res.render("General/home", {
      locations: results,
      notification: req.query.notify
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