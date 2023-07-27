const express = require('express');
const app = express();
const port = 8080;

const db = require('./config/mongoose');


app.use(express.urlencoded({ extended: true }));

// create partials and layouts 
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

// extract style and scripts from sub pages into layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// set up view engine
app.set('view engine' , 'ejs');
app.set('views', './views');

// setting up assets as your static folder
app.use(express.static('./assets'));

// using express Routes  
app.use('/', require('./routes'));

app.listen(port , function(err){
    if(err)
    {
        console.log('Error in running the server', err);
    }
    console.log('My Express server is runnig on port 8080');
})