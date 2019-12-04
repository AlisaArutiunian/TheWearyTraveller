const express = require('express');
const router = express.Router();
const RoomInfo = require('../models/room')
const path = require("path");


router.get("/",(req,res)=>
{
    res.render("updateRoom");

});

router.get("/:id",(req,res)=>
{
    RoomInfo.findById(req.params.id)
    .then((room)=>{

        res.render("updateRoom",{
            room: room
        })

    })
    .catch(err=>console.log(`Error : ${err}`));
});

router.put("/:id",(req,res)=>
{ 
    RoomInfo.findById(req.params.id)
    .then((room)=> {
        room.title = req.body.title,
        room.price = req.body.price,
        room.description = req.body.description,
        room.location = req.body.location,
        room.image = req.body.image

       room.save()
       .then(() =>
       {
           res.redirect("/admin")
       })
       .catch(err=>console.log(`Error : ${err}`));

    })
    .catch(err=>console.log(`Error : ${err}`));

});

/*
router.post("/",(req,res)=>
{ 
    console.log(`Room works`);


    const room = new RoomInfo({
        title:req.body.title,
        price:req.body.price,
        description : req.body.description,
        location: req.body.location,
        imageRoom: req.body.image
    });
    
    // TODO: implement logic for data checking 
    // (mostly nulls, other business rules)
    // if fails - render, send the object back with errors
    
    room.save()
    .then(()=>{
        console.log(`Room was added to the database`);
        console.log(`${room}`);
        res.redirect("/admin");
    })
    .catch(err=>console.log(`Error : ${err}`));

});*/



router.post('/', function(req, res){

    const error = {
        title: [],
        price: [],
        location: [],
        image: []
    };

    if (req.body.title === '') {
        error.title.push('Please enter the room title');
    }

    if (req.body.price === '') {
        error.price.push('Please enter the price');
    }

    if (req.body.location === '') {
        error.location.push('Please enter the location');
    }

    if (req.files == null)
    {
        error.image.push('Please upload the file');
    } else 
    {
       if(req.files.image.mimetype.indexOf("image")==-1){

        errors.image.push("Sorry you can only upload images");

        }
    }


    if (error.title.length > 0 ||
        error.price.length > 0 ||
        error.location.length > 0 ||
        error.image.length > 0) {

            res.render('updateRoom', {
                title: req.body.title,
                price: req.body.price,
                description: req.body.description,
                location: req.body.location,
                //image: req.body.image,
                error:error
            });
        } else {
            const room = new RoomInfo({
                title: req.body.title,
                price: req.body.price,
                description: req.body.description,
                location: req.body.location,
                //image: req.body.image
            });

            room.save().then(room=>
                {
                    req.files.image.name = `db_${room._id}${path.parse(req.files.image.name).ext}`
                    req.files.image.mv(`public/images/${req.files.image.name}`)
                    .then(() =>{
                        RoomInfo.findByIdAndUpdate(room._id,{
                            image:req.files.image.name 
                        })
                        .then(()=>{
                            console.log(`File name was updated in the database`)
                            res.redirect("/admin");
                        }) .catch(err=>console.log(`Error :${err}`));
                    });
            }).catch((err) => {
                console.log(`Houston, we have a problem: ${err}`);
              });

        }

});


module.exports=router;