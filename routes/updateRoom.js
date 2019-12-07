const express = require('express');
const router = express.Router();
const RoomInfo = require('../models/room')
const path = require("path");
const auth = require('../middleware/auth');
const auth2 = require('../middleware/adminauth');


router.get("/",auth,auth2, (req,res)=>
{
    res.render("Admin/updateRoom");

});

router.get("/:id",auth,auth2,(req,res)=>
{
    RoomInfo.findById(req.params.id)
    .then((room)=>{

        res.render("Admin/updateRoom",{
            room: room
        })

    })
    .catch(err=>console.log(`Error : ${err}`));
});

const insertOrUpdate = async function (req, res, id) {
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

            res.render('Admin/updateRoom', {
                room: {
                    title: req.body.title,
                    price: req.body.price,
                    description: req.body.description,
                    location: req.body.location,
                    image: req.body.image,
                },
                error: error
            });
        } else {

            let room;

            if (id === null) {
                room = new RoomInfo();
            } else {
                room = await RoomInfo.findById(id)
                                .catch(err=>console.log(`Error : ${err}`));
                                
                /*RoomInfo.findById(req.params.id)
                    .then((room)=> {
                        room.title = req.body.title,
                        room.price = req.body.price,
                        room.description = req.body.description,
                        room.location = req.body.location,
                        room.image = req.body.image
                    })
                    .catch(err=>console.log(`Error : ${err}`));*/
            }

            room.title = req.body.title;
            room.price = req.body.price;
            room.description = req.body.description;
            room.location = req.body.location;
            room.image = req.body.image;

            room.save().then(room =>
                {
                    if (req.files) {
                        req.files.image.name = `db_${room._id}${path.parse(req.files.image.name).ext}`;
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
                    }
                    
            }).catch((err) => {
                console.log(`Houston, we have a problem: ${err}`);
              });

        }
};

router.put("/:id", auth,auth2, (req,res) =>
{ 
    insertOrUpdate(req, res, req.params.id);
});

router.post('/', auth,auth2, (req, res)=>{
    insertOrUpdate(req, res, null);
});

module.exports=router;