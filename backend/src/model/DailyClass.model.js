const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
    subject: String,
    teacher: String,
    time: String,
    type: String,
    isModified: { type: Boolean, default: false } // 🔥 important
});

const dailySchema = new mongoose.Schema({
    day: String,
    date: String,
    classes: [classSchema]
});

const dailyClass = mongoose.model("DailyClass", dailySchema);

module.exports = dailyClass;