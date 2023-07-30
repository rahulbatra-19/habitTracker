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
                console.log("User created!!");
                await User.create(req.body);
                return res.redirect('/');
            }
        }
    } catch (err) {
        console.log('Error in creatiing user', err);
    }
}

module.exports.createSession =  function (req, res) {
    // try {
    //     let user = await User.findOne(req.body);
    //     if (user) {
    //         return res.redirect('/habit');
    //     } else {
    //         console.log('Please create a User first ');
    //         return res.redirect('/sign-up');
    //     }
    // } catch (err) {
    //     console.log('Error in sign in ', err);
    // }
    res.redirect('/habit');
}



module.exports.destroySession = function (req, res) {
    req.logout(err => {
        console.log(err);
    });
    return res.redirect('/');
} 