const Habit = require('../models/habit');
module.exports.createHabit = async function(req, res){
    try {
        console.log(res.locals);
        let habitexist = await Habit.findOne({habitName : req.body.habitName});
        if(habitexist){
            return res.redirect('back');
        }else{
            let habit = await Habit.create({
                user : req.user,
                habitName : req.body.habitName,
                habitStatus:[
                    {
                        date: new Date(),
                        status : 'none'
                    }
                ]
            });
            console.log('Habit created');
            console.log(habit);

            res.render('home',{
                title :"home",
                habits : habit
            });
            return res.redirect('back');
        }
    } catch (error) {
        console.log('Errror in creating a habit', error);
        return res.redirect('back');
    }
}


module.exports.destroy = async function(req, res){
    try {
        let habit = await Habit.findById(req.params.id);
        habit.deleteOne();
        return res.redirect('back');
    } catch (error) {
        console.log('Error *****', error);
        return res.redirect('back');
    }
}

module.exports.updateStatus = async function(req, res){
    try {
        let habit = await Habit.findById(req.params.id).populate('habitName');
        if(habit.habitStatus[0].status =='none'){
            habit.habitStatus[0].status = 'done';
        }else if(habit.habitStatus[0].status == 'not_done'){
            habit.habitStatus[0].status = 'done';
        }else if(habit.habitStatus[0].status == 'done'){
            habit.habitStatus[0].status = 'not_done';
        }
        habit.save();
        return res.redirect('back');
    } catch (error) {
        console.log("Error in updating status,", error);
        return res.redirect('back');
    }
}

module.exports.weeks = async function(req, res){
    try {
        let habits = await Habit.find({users : req.user });
        res.render('weeks_page',{
            title : 'weeks',
            habits : habits
        });
    } catch (error) {
        console.log('Error in opening week days', error);
        return res.redirect('back');
    }
}