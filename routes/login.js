const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const UserInfo = require('../models/userInfo');
const auth = require('../middleware/auth');


router.get("/",(req,res)=>
{
    res.render("General/home", {
        loginDisplay: true
    });

});


router.post('/', (req, res)=>
{

    const error = {
      email: [],
      password: [],
    };
  
    if (req.body.inEmail === '') {
      error.email.push('Please enter your email address');
    }
  
    if (req.body.inPassword === '') {
      error.password.push('Please enter your password');
    }

    if (error.email.length > 0 ||
      error.password.length > 0 ) {
  
      res.render('General/home', {
     
        loginDisplay: true,
        outEmail: req.body.inEmail,
        error: error,
      });
    } else {
      //res.redirect('registration');
    
    UserInfo.findOne({email: req.body.inEmail})
    .then(user=>{
      if(user==null)
      {
        error.email.push(`Sorry we didn't find your email`);
        res.render("General/home", {
          loginDisplay: true,
          error:error
        });
      } else 
      {
        bcrypt.compare(req.body.inPassword, user.password)
        .then(isMatched=>{
          if(isMatched == true)
          {
            req.session.userInfo = user;
            res.redirect("/profile");
          } else 
          {
            error.password.push("Sorry, your password does not match");
            res.render("General/home", {
              loginDisplay: true,
              error:error
            });
          }
        })
        .catch(err=>console.log(`Error :${err}`));
      }
    })
    .catch(err=> console.log(`Something occured ${err}`));

  } 
  });
  

  router.get("/logout",auth, (req,res)=>
  {
    req.session.destroy();
    res.redirect('/');
  })


module.exports = router; //keep at the bottom

