const User = require('../models/user');

// this is to sign in a user
module.exports.signIn = async function (req, res) {

    if(req.isAuthenticated()){
        return res.redirect('/home');
     }
    res.render('sign_in', {
        title: "Sign In page"
    });
}
// this is to sign up a user

module.exports.signUp = async function (req, res) {

    if(req.isAuthenticated()){
        return res.redirect('/home');
     }
    res.render('sign_up', {
        title: "Sign Up Page"
    });
}


// this is to create a user after signing up

module.exports.create = async function (req, res) {
    try {
        let user = await User.findOne({
            username: req.body.username,
            password: req.body.password
        });
        if (user) {
            console.log('Already Registered');
            return res.redirect('back');
        }
        else {
            if (req.body.password != req.body.confirm_password) {
                console.log('Passwords do not match');
                return res.redirect('back');
            } else {
                console.log(req.body.username);
                let user = await new User({
                    username : req.body.username,
                    password : req.body.password
                });
                user.save();
                // console.log(user);
                console.log("User created!!");

                return res.redirect('/');
            }
        }
    } catch (err) {
        console.log('Error in creatiing user', err);
    }
}

// this is to create a session after sign in from passport 


module.exports.createSession =  function (req, res) {
    res.redirect('/habit');
}


// this is to destroy a sesssion
module.exports.destroySession = function (req, res) {
    req.logout(err => {
        console.log(err);
    });
    return res.redirect('/');
} 


