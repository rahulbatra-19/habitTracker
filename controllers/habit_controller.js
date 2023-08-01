const cron = require('node-cron');
const Habit = require('../models/habit');

// This is to create a habit 
module.exports.createHabit = async function (req, res) {
    try {
        console.log(req.user);
        let habitexist = await Habit.findOne({user : req.user, habitName: req.body.habitName });
        if (habitexist) {
            return res.redirect('back');
        } else {
            let habit = await Habit.create({
                user: req.user,
                habitName: req.body.habitName,
                habitStatus: [
                    {
                        date: new Date(),
                        status: 'none'
                    }
                ]
            });


            res.render('home', {
                title: "home",
                habits: habit
            });
            return res.redirect('back');
        }
    } catch (error) {
        console.log('Errror in creating a habit', error);
        return res.redirect('back');
    }
}


// This is to destroy a habit
module.exports.destroy = async function (req, res) {
    try {
        let habit = await Habit.findById(req.params.id);
        habit.deleteOne();
        return res.redirect('back');
    } catch (error) {
        console.log('Error *****', error);
        return res.redirect('back');
    }
}

// This is to update the status of habit
module.exports.updateStatus = async function (req, res) {
    try {

        let habit = await Habit.findById(req.params.id);
        let index = req.params.index;
        let status = habit.habitStatus[index].status;
        if(status=='none'){
            status = 'done';
        }else if(status=='not_done'){
            status = 'none';
        }else if(status =='done'){
            status = 'not_done';
        }
        habit.habitStatus[index].status = status;
        habit.save();
        // return res.redirect('back');
        return res.status(200).json({
            message : 'Reaction Created',
            data:{
                status :status
            }
        });

    } catch (error) {
        console.log("Error in updating status,", error);
        return res.redirect('back');
    }
}

// This is for the week view of habits
module.exports.weeks = async function (req, res) {

    try {
        if (!req.isAuthenticated()) {
            return res.redirect('/');
        }
        let habits = await Habit.find({ user: req.user });
        res.render('weeks_page', {
            title: 'weeks',
            habits: habits
        });
    } catch (error) {
        console.log('Error in opening week days', error);
        return res.redirect('back');
    }
}

// This is to create a new habit everynight at 12:00Am
cron.schedule('0 0 * * *', async () => {
    try {
        const habits = await Habit.find();
        const today = new Date();
        for (let habit of habits) {
            let newdayHabit = {
                date: today,
                status: 'none'
            };
            if (habit.habitStatus.length < 7) {
                habit.habitStatus.unshift(newdayHabit);
            } else {
                habit.habitStatus.splice(6, 1);
                habit.habitStatus.unshift(newdayHabit);
            }
            console.log(habit);
            habit.save();
        }
    } catch (error) {
        console.error('Error updating habitStatus:', error);
    }
});