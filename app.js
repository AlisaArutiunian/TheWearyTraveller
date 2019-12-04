const express = require('express');
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const fileupload = require("express-fileupload");
const session = require("express-session");

mongoose.set('useFindAndModify', false);


//to load env variables
require("dotenv").config({path:'./config/keys.env'});


//const logOutRouter = require('./routes/logout');


//create app object
const app = express();

//using bodyparser
app.use(bodyParser.urlencoded({ extended: false }));


//using fileupload
app.use(fileupload())


//overriding
app.use(methodOverride('_method'));


//to load all environmental variables
app.use(express.static('public'));


//keys
//app.use(session({secret: "This is my secret key"}))

//importing router objects
const logRouter = require('./routes/login');
const regRouter = require('./routes/registration');
const roomRouter = require('./routes/roomListing');
const homeRouter = require('./routes/home');
const adminRouter = require('./routes/admin');
const updateRouter = require('./routes/updateRoom');

//Mapping express to all router objects
app.use('/login', logRouter);
app.use('/registration', regRouter);
app.use('/roomListing', roomRouter);
app.use('/', homeRouter);
app.use('/admin', adminRouter);
app.use('/updateRoom', updateRouter);


//use handlebars as template engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


const DBURL= `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DATABASE_NAME}/${process.env.MONGO_USERNAME}`;
mongoose.connect(DBURL, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log(`Database is connected`);
  }).catch((err) => {
    console.log(`Something went wrong : ${err}`);
  });


const PORT = process.env.PORT || 5500

app.listen(PORT, ()=>{
    console.log(`Web server is connected at PORT${PORT}`)
})