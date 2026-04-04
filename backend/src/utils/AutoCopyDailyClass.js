const DailyClass = require('../model/DailyClass.model');
const WeeklyClass = require('../model/WeeklyClasses.model');


const autoCopyTodayClass = async () => {
    try {
        const today = new Date();
        const dayName = today.toLocaleString('en-US', { weekday: 'long' });
        const todayDate = today.toDateString();

        // duplicate check
        const exists = await DailyClass.findOne({ date: todayDate });

        if (exists) {
            console.log("Already copied today");
            return;
        }

        // weekly data fetch
        const weekly = await WeeklyClass.findOne({ day: dayName });

        if (!weekly) {
            console.log("No class found for today ");
            return;
        }

        // create daily data
        await DailyClass.create({
            day: dayName,
            date: todayDate,
            classes: weekly.classes
        });

        console.log("Today class copied successfully");

    } catch (error) {
        console.log("Error:", error.message);
    }
};

module.exports = autoCopyTodayClass;