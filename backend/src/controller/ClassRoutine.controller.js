const weeklyClass = require("../model/WeeklyClasses.model");
const DailyClass = require("../model/DailyClass.model");
const mongoose = require("mongoose");

// ✅ helper (capitalize for response only)
const formatDay = (day) => {
    return day.charAt(0).toUpperCase() + day.slice(1);
};


// ✅ GET
const WeeklyClassGet = async (req, res) => {
    try {
        const weeklyclass = await weeklyClass.find();

        if (!weeklyclass || weeklyclass.length === 0) {
            return res.status(404).json({ message: 'No classes found' });
        }

        res.status(200).json({
            message: 'Classes found successfully',
            weeklyclass: weeklyclass.map(item => ({
                ...item._doc,
                day: formatDay(item.day)
            }))
        });

    } catch (error) {
        console.log("GET ERROR:", error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};


// ✅ ADD
const addWeeklyClass = async (req, res) => {
    try {
        let { day, classes } = req.body;

        if (!day || !classes || classes.length === 0) {
            return res.status(400).json({ message: "Day and classes required" });
        }

        for (let cls of classes) {
            if (!cls.subject || !cls.teacher || !cls.type || !cls.time) {
                return res.status(400).json({ message: "All class fields are required" });
            }
        }

        day = day.toLowerCase();

        const exists = await weeklyClass.findOne({ day });

        if (exists) {

            const isDuplicate = exists.classes.some(existing =>
                classes.some(newCls =>
                    existing.subject === newCls.subject &&
                    existing.time === newCls.time
                )
            );

            if (isDuplicate) {
                return res.status(400).json({ message: "Duplicate class found" });
            }

            exists.classes.push(...classes);
            await exists.save();

            return res.status(200).json({
                message: "Day already exists, classes added successfully",
                weeklyclass: {
                    ...exists._doc,
                    day: formatDay(exists.day)
                }
            });
        }

        const weeklyclass = await weeklyClass.create({
            day,
            classes
        });

        res.status(201).json({
            message: "Class added successfully",
            weeklyclass: {
                ...weeklyclass._doc,
                day: formatDay(weeklyclass.day)
            }
        });

    } catch (error) {
        console.log("ADD ERROR:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};


// ✅ DELETE
const deleteWeeklyClass = async (req, res) => {
    try {
        let { day } = req.params;

        day = day.toLowerCase();

        const weeklyclass = await weeklyClass.findOneAndDelete({ day });

        if (!weeklyclass) {
            return res.status(404).json({ message: 'Class not found' });
        }

        res.status(200).json({
            message: 'Class deleted successfully',
            weeklyclass: {
                ...weeklyclass._doc,
                day: formatDay(weeklyclass.day)
            }
        });

    } catch (error) {
        console.log("DELETE ERROR:", error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};


// ✅ EDIT
const editWeeklyClass = async (req, res) => {
    try {
        const id = req.params.id.trim();
        let { day, classes } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        if (!day || !classes || classes.length === 0) {
            return res.status(400).json({ message: "Day and classes required" });
        }

        day = day.toLowerCase();

        const weeklyclass = await weeklyClass.findByIdAndUpdate(
            id,
            { day, classes },
            { new: true }
        );

        if (!weeklyclass) {
            return res.status(404).json({ message: "Class not found" });
        }

        res.status(200).json({
            message: "Class updated successfully",
            weeklyclass: {
                ...weeklyclass._doc,
                day: formatDay(weeklyclass.day)
            }
        });

    } catch (error) {
        console.log("EDIT ERROR:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};
const getDailyClass = async (req, res) => {
    try {
        const today = new Date();

        const dayName = today
            .toLocaleString("en-US", { weekday: "long" })
            .toLowerCase();

        const todayDate = today.toDateString();

        const deleted = await DailyClass.deleteMany({
            date: { $ne: todayDate }
        });

        console.log("Deleted old data:", deleted.deletedCount);

        // 🔍 check already exists in daily
        const existing = await DailyClass.findOne({ date: todayDate });

        if (existing) {
            return res.status(200).json({
                message: "Today's classes (from daily)",
                day: existing.day.charAt(0).toUpperCase() + existing.day.slice(1),
                classes: existing.classes
            });
        }

        // 🔍 get from weekly
        const weekly = await weeklyClass.findOne({ day: dayName });

        if (!weekly) {
            return res.status(404).json({ message: "No class found for today" });
        }

        // 💾 save to daily
        const daily = await DailyClass.create({
            day: dayName,
            date: todayDate,
            classes: weekly.classes
        });

        res.status(200).json({
            message: "Today's classes generated",
            day: dayName.charAt(0).toUpperCase() + dayName.slice(1),
            classes: daily.classes
        });

    } catch (error) {
        console.log("DAILY CLASS ERROR:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};


        

module.exports = {
        WeeklyClassGet,
        addWeeklyClass,
        deleteWeeklyClass,
        editWeeklyClass,
        getDailyClass
    };