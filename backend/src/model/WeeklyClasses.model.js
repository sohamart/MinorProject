const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
    subject: String,
    teacher: String,
    time: String,
    type: String
});

const weeklySchema = new mongoose.Schema({
    day: { type: String, required: true },
    classes: [classSchema]
});

const weeklyClass = mongoose.model("WeeklyClass", weeklySchema);

module.exports = weeklyClass;