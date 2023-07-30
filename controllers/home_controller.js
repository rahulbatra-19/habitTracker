const Habit = require('../models/habit');

module.exports.home = async function(req, res){
    try {
        if (!req.isAuthenticated()) {
            return res.redirect('/');
        }

        let habits = await Habit.find({user: req.user}).sort('-createdAt');
        // console.log(habits);
        
        res.render('home',{
            title :"home" , 
            habits : habits
        });
    } catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}

