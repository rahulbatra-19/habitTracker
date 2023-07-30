const express = require('express');
const app = express();
const port = 8080;

const db = require('./config/mongoose');

const cookieParser = require('cookie-parser');

//  user for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

const MongoStore = require('connect-mongo');
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// create partials and layouts 
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

// extract style and scripts from sub pages into layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// set up view engine
app.set('view engine', 'ejs');
app.set('views', './views');


 // mongo store is used to store the session cookie in the db
 app.use(session({
    name: 'Habit',
    // todo hange the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/habitTracker_db',
        autoRemove: 'disabled'
    },
    function (err) {
        console.log(err || 'connect-mongoDB setup');
    })
}));


app.use(passport.initialize());
 app.use(passport.session());

 app.use(passport.setAuthenticatedUser);

// setting up assets as your static folder
app.use(express.static('./assets'));

// using express Routes  
app.use('/', require('./routes'));

app.listen(port, function (err) {
    if (err) {
        console.log('Error in running the server', err);
    }
    console.log('My Express server is runnig on port 8080');
})