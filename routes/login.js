const express = require('express');
const router = express.Router();


router.get("/",(req,res)=>
{
    res.render("home", {
        loginDisplay: true
    });

});


router.post('/', function(req, res) {

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
  
      res.render('home', {
     
        loginDisplay: true,
        outEmail: req.body.inEmail,
        error: error,
      });
  
    } else {
      res.redirect('registration');
    }
  
  });


module.exports = router; //keep at the bottom

