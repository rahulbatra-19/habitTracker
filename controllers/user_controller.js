const User = require('../models/user');


module.exports.signIn = async function (req, res) {

    if(req.isAuthenticated()){
        return res.redirect('/home');
     }
    res.render('sign_in', {
        title: "Sign In page"
    });
}

module.exports.signUp = async function (req, res) {

    if(req.isAuthenticated()){
        return res.redirect('/home');
     }
    res.render('sign_up', {
        title: "Sign Up Page"
    });
}



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

module.exports.createSession =  function (req, res) {
    res.redirect('/habit');
}



module.exports.destroySession = function (req, res) {
    req.logout(err => {
        console.log(err);
    });
    return res.redirect('/');
} 

module.exports.signOut = async function(req, res){
    req.logout(function (err) {
        if (err) { return next(err); }
    });
    // req.flash('success', 'Logged out successfully!');
    return res.redirect('/');
}

