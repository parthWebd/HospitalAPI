const express = require ('express');
const port  = 8000;
const app = express();
const db = require('./config/mongoose');
const expressLayouts=require('express-ejs-layouts')
//to use flash messages
const flash=require('connect-flash');
const customWare=require('./config/middleware');
//flash message use sessions
const session=require('express-session');
const mongoStore=require('connect-mongo')(session);

// for passport
const passport = require('passport');
const JWTPassport = require('./config/passport-jwt-strategy')


app.use(express.urlencoded({extended : true}))

app.use(expressLayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//for the template engine
app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name:'Doctor',
    secret: 'something',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:120000,
    },
    store:new mongoStore({
        mongooseConnection:db,
        autoRemove: 'disabled'
    },function(err){
        console.log(err || 'Connect Mongo DB setup ok');
    })
}))

app.use(flash());
app.use(customWare.setFlash);
app.use('/',require('./routes/index'));

app.listen(port,function(err){
    if(err){console.log(err);return;}
    console.log("Server up and running at", port);
})