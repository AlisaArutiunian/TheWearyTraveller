const express = require('express');
const router = express.Router();
const RoomInfo = require('../models/room');
const auth = require('../middleware/auth');
const auth2 = require('../middleware/adminauth');


router.get("/", auth, auth2, (req,res) =>
{
    RoomInfo.find()
    .then((rooms)=>{
        res.render("Admin/admin", {
           rooms: rooms
        });
    })
    .catch(err=>console.log(`Error : ${err}`));
   
});

router.delete("/delete/:id", auth, auth2, (req,res)=>
{
    console.log(`Room is gone`);
    RoomInfo.deleteOne({_id:req.params.id})
    .then((room)=>{
        res.redirect("/admin");
    })
    .catch(err=>console.log(`Error : ${err}`));
});
//TODO : create warning to prevent accidental deletes

module.exports=router;