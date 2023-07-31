const Habit = require('../models/habit');

module.exports.home = async function(req, res){
    try {
        if (!req.isAuthenticated()) {
            return res.redirect('/');
        }

        let habits = await Habit.find({user: req.user});

        for(let habit of habits ){
            // console.log(habit);s
            habit.save();
        }
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

