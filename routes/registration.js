const express = require('express');
const router = express.Router();
const UserInfo = require('../entities/userInfo');
const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');


router.get("/",(req,res)=>
{
    res.render("home", {
        regDisplay: true
    });

});
const checkNums = /[0-9]+/;
const checkCaps = /[A-Z]+/;

router.post('/', function(req, res) {

    const error = {
      email: [],
      firstname: [],
      lastname: [],
      password: [],
      birthday: []
    };
  
    if (req.body.inEmail === '') {
      error.email.push('Please enter your email address');
    }

    if (req.body.inFirstName === '') {
      error.firstname.push('Please enter your first name');
    }

    if (req.body.inLastName === '') {
      error.lastname.push('Please enter your last name');
    }

    if (req.body.inBirthday === '') {
      error.birthday.push('Please enter your birthday');
    }
  
    if (req.body.inPassword === '') {
      error.password.push('Please enter your password');
    } else {
      if (!checkNums.test(req.body.inPassword))
      {
        error.password.push('Password should contain at least one digit');
      } 
      if(!checkCaps.test(req.body.inPassword))
      {
        error.password.push('Password should contain at least one upper case letter');
      }
    }
  
    if (error.email.length > 0 ||
      error.firstname.length > 0 ||
      error.lastname.length > 0 ||
      error.password.length > 0 ||
      error.birthday.length) {
  
      res.render('home', {
     
        regDisplay: true,
        outEmail: req.body.inEmail,
        outFirstName: req.body.inFirstName,
        outLastName: req.body.inLastName,
        outBirthday: req.body.inBirthday,
        error: error,
      });
  
    } else {

      const User = new UserInfo({
        email: req.body.inEmail,
      firstname: req.body.inFirstName,
      lastname: req.body.inLastName,
      password: req.body.inPassword,
      birthday: req.body.inBirthday
 
      });

      User.save().then(() =>
    {
      console.log('A user has been added');
      const options = {
      auth: {
      api_key: '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',
           },
      };

      const mail = nodemailer.createTransport(sgTransport(options));
      const email = {
        to: `${req.body.inEmail}`,
        from: 'aarutiunian@myseneca.ca',
        subject: 'The Weary Traveller welcomes you',
        text: 'Welcome, weary traveller!',
        html: 'Welcome to The Weary Traveller',
      };

      mail.sendMail(email, (err, res1)=> {

        if (err) {
          console.log(`Error sending email: ${err}`);
        } else {
          console.log(res1);
        }

      });

      }).catch((err) => {
        console.log(`Houston, we have a problem: ${err}`);
      });

      res.redirect('/');
    }
  
  });



  module.exports = router;
