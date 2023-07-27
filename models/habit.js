const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
    user :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    habitName : {
        type : String,
        required:  true
    },
    habitStatus: [
        {
          date: { type: Date, required: true },
          status: { type: String, enum: ['done', 'not_done', 'none'], required: true },
        },
      ]
},{
    timestamps: true
});

const Habit = mongoose.model('Habit', habitSchema);
module.exports = Habit; 