const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const RoomInfo = require('../models/room');
const BookedRooms = require('../models/bookedRooms');


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

router.post('/:id', auth, (req, res)=>{

    RoomInfo.findById(req.params.id)
    .then((room)=>{

        if (room) {
            const bookedRoom = new BookedRooms({
                userInfo: req.session.userInfo._id,
                roomInfo: room._id //this is from room URL
            });
            bookedRoom.save()
            .then(()=>{
                res.redirect('/profile');
            }) .catch(err=>console.log(`Error: ${err}`))
           
        } else {
            res.redirect('/profile');
        }
    }) .catch(err=>console.log(`Error: ${err}`))

});



module.exports=router;