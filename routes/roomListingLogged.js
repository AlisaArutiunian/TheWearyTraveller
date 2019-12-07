const express = require('express');
const router = express.Router();
const RoomInfo = require('../models/room');


router.get("/",(req,res)=>
{
    const location = req.query.location; //check url

    const row = [];
    let cols = [];

    RoomInfo.find((location ? {location:location} : null))
    .then((rooms)=>{

        let i = 0;

        for (const room of rooms){
            if(cols.length <= 3)
            {
                cols.push(room);
            }

            if(cols.length >= 3)
            {
                row.push(cols);
                cols = [];
            }

        }

        if(cols.length > 0)
        {
            row.push(cols);
        }
        res.render("RegUser/roomListingLogged", {
           rooms: row
        });
    })
    .catch(err=>console.log(`Error : ${err}`));

});


module.exports=router;