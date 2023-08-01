const Habit = require('../models/habit');


// this is for home page when user has signed in
module.exports.home = async function(req, res){
    try {
        if (!req.isAuthenticated()) {
            return res.redirect('/');
        }

        let habits = await Habit.find({user: req.user});

        
        res.render('home',{
            title :"home" , 
            habits : habits
        });
    } catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}

