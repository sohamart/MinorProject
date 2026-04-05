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
      },
      remarks:{
        type:String,
        default :""
      }
});

const dailySchema = new mongoose.Schema({
    day: String,
    date: String,
    classes: [classSchema]
});

const dailyClass = mongoose.model("DailyClass", dailySchema);

module.exports = dailyClass;