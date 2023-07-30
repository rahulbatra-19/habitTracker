const passport = require('passport');

const LocalStratergy = require('passport-local').Strategy;

const User = require('../models/user');

// authentication using passport
passport.use(new LocalStratergy({
    usernameField: 'username',
    passReqToCallback: true
},
    async function (req, username, password, done) {
        // find a user and establish the identity  
        try{   
        let user = await User.findOne({ username: username });
                if (!user|| password!= user.password ) {
                    // req.flash('success', 'Invalid Password');
                    return done(null, false);
                }
                return done(null, user);
            }
            catch(err) {
                // req.flash('error', err);
                console.log(err);
                return done(err);
            };
    }
));

// serializing the user to decide which key is to be kept in cookies
passport.serializeUser((user, done) => {
    done(null, user.id);
});



// deserializing the user from the key in the cookies
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(
            user => {
                if (!user) {
                    console.log('User not found');
                    return done(null, false);
                }
                return done(null, user);
                // return done(null, user);
            }
        )
        .catch(err => {
            console.log('Error in finding user--->Passport');
            return done(err);
        });
});


// check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
    // if the user is sign in, then pass on the request to the next function(controller's action)
    if (req.isAuthenticated()) {
        return next();
    }
    // if the user is not sign in to the page 
    return res.redirect('/');
}

passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;



