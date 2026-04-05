const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
      subject : {
        type: String,
        required: true,
      },
      teacher : {
        type: String,
        required: true,
      },
      time : {
        type: String,
        required: true,
      },
      type : {
        type: String,
        enum : ["Theory", "Lab"],
        required: true
      }
});

const weeklySchema = new mongoose.Schema({
    day: { type: String, required: true },
    classes: [classSchema]
});

const weeklyClass = mongoose.model("WeeklyClass", weeklySchema);

module.exports = weeklyClass;