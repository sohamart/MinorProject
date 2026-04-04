const WeeklyClass = require('../model/WeeklyClasses.model');
const DailyClass = require('../model/DailyClass.model');

const autoCopyTodayClass = async () => {
    try {
        const today = new Date();
        const dayName = today.toLocaleString('en-US', { weekday: 'long' });
        const todayDate = today.toDateString();

        console.log("Today:", dayName);

        const weekly = await WeeklyClass.findOne({
            day: { $regex: new RegExp(`^${dayName.trim()}$`, "i") }
        });

        if (!weekly) {
            console.log("❌ No weekly data found for:", dayName);
            return;
        }

        let daily = await DailyClass.findOne({ date: todayDate });

        if (!daily) {
            await DailyClass.create({
                day: dayName,
                date: todayDate,
                classes: weekly.classes
            });

            console.log("✅ Fresh copy created");
            return;
        }

        // 🔥 MERGE
        const updatedClasses = [];

        for (let w of weekly.classes) {
            const match = daily.classes.find(
                (d) => d.subject === w.subject
            );

            if (match) {
                updatedClasses.push(match);
            } else {
                updatedClasses.push(w);
            }
        }

        daily.classes = updatedClasses;
        await daily.save();

        console.log("✅ Merged successfully");

    } catch (error) {
        console.log("❌ ERROR:", error.message);
    }
};

module.exports = autoCopyTodayClass;

//