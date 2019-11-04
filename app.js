const express = require('express');
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

app.use(express.static('public'));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


app.use(bodyParser.urlencoded({ extended: false }));

//routers

const logRouter = require('./routes/login');
const regRouter = require('./routes/registration');
app.use('/login', logRouter);
app.use('/registration', regRouter);





const DBURL= "mongodb://heroku_2tzfl4n9:ck2uqofbtmqcldrhnnju92l7gh@ds241278.mlab.com:41278/heroku_2tzfl4n9";
mongoose.connect(DBURL, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log(`Database is connected`);
  }).catch((err) => {
    console.log(`Something went wrong : ${err}`);
  });


app.get("/",(req,res)=>
{

  res.render("home");

});



app.get("/roomListing",(req,res)=>
{
    res.render("roomListing")

});



const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`Web server is connected at PORT${PORT}`)
})