const cron = require('node-cron');
const Habit = require('../models/habit');

module.exports.createHabit = async function (req, res) {
    try {
        console.log(res.locals);
        let habitexist = await Habit.findOne({ habitName: req.body.habitName });
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
            console.log('Habit created');
            console.log(habit);

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
        return res.redirect('back');

    } catch (error) {
        console.log("Error in updating status,", error);
        return res.redirect('back');
    }
}

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

// cron.schedule('0 0 * * * * *', async () => {
//     try {
//         const habits = await Habit.find();
//         const today = new Date();
//         for (let habit of habits) {
//             let newdayHabit = {
//                 date: today,
//                 status: 'none'
//             };
//             if (habit.habitStatus.length < 7) {
//                 habit.habitStatus.unshift(newdayHabit);
//             } else {
//                 habit.habitStatus.splice(6, 1);
//                 habit.habitStatus.unshift(newdayHabit);
//             }
//             console.log(habit);
//             habit.save();
//         }
//     } catch (error) {
//         console.error('Error updating habitStatus:', error);
//     }
// });