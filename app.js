const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
var app = express();
var session = require('cookie-session');


const {index} = require('./routes/index');
const {history,display,course3page,event1page,enrollform,aboutpage,permanentdeleteuser,course1page,course2page,contactpage, deleteuser, activate,edit, editpage} = require('./routes/player');
const {signup,login,signupform,logout,loginpage} = require('./routes/user');

var port = process.env.PORT||8080;

// create connection to database


const db = mysql.createPool ({
    connectionLimit : 100,
    host: 'us-cdbr-iron-east-02.cleardb.net',
    user: 'b7e2437887xxxa',
    password: '0200xxx6',
    database: 'heroku_7643ec736354xxx'
});

// connect to database
module.exports = db;
global.db = db;
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.

// configure middleware
app.set('port', process.env.PORT || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
//app.use(fileUpload(14748364)); // configure fileupload
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))


// routes for the app

app.get('/about', aboutpage);
app.get('/contact', contactpage);
app.get('/course1', course1page);
app.get('/course2', course2page);
app.get('/event1', event1page);
app.get('/edit/:user_name', editpage);
app.get('/delete/:user_name', deleteuser);
app.get('/permanentdelete/:id', permanentdeleteuser);
app.get('/activate/:user_name', activate);
app.post('/edit/:user_name', edit);
app.get('/',index);//call for main index page
app.post('/login',login);//call for login page
app.get('/login',loginpage);
app.get('/signup',signup);//call for signup page
app.get('/logout',logout);
app.get('/enroll/:course_name',enrollform);
app.post('/signup',signupform);
app.get('/course3', course3page);
app.get('/display/:course_name', display);
app.get('/history/v',history);



// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
