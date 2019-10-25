const express = require('express');
const exphbs = require('express-handlebars')
const app = express();

app.use(express.static('public'));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


app.get("/",(req,res)=>
{

  res.render("home");

});

app.get("/registration",(req,res)=>
{

    res.render("registration")

});

app.get("/login",(req,res)=>
{
    res.render("login")

});


app.get("/roomListing",(req,res)=>
{
    res.render("roomListing")

});



const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`Web server is connected at PORT${PORT}`)
})