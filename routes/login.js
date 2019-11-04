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
      res.redirect('listing');
    }
  
  });
/*app.post('/login', (res,req)=>{

    let login  = true;
    
    let Email = {
    
        input:req.body.Email,
        //error :""
    }
    
    if (Email.input == "")
    {
        Email.error = "Please enter your email";
        login = false
    }
    
    let password = {
    
        input:req.body.password,
        //error : ""
    }
    
    if (password.input == "")
    {
        password.error = "Please enter your password"
        login = false;
    }
    
    if(!login)
    
    res.render("/",
    {
        errEmail:Email.error,
        errPassword: password.error,
    
    })
    
    else
    {
        res.redirect("/");
    }
    
    })*/

module.exports = router; //keep at the bottom

