const mongoose = require('mongoose');

const dailyClassSchema = new mongoose.Schema({
    day: String,
    date: String,
    classes: [
        {
            subject: String,
            teacher: String,
            time: String,
            type: {
                type: String,
            },
            remarks: {
                type: String,
                
            }
        }
    ]
}, { timestamps: true });

const dailyClassModel = mongoose.model('dailyClass', dailyClassSchema);

module.exports = dailyClassModel;