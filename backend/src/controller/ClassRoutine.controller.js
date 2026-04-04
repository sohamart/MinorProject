const DailyClass = require('../model/DailyClass.model');
const WeeklyClass = require('../model/WeeklyClasses.model');
const autoCopyTodayClass = require('../utils/AutoCopyDailyClass');


// ================================
// ✅ ADD WEEKLY (ADMIN)
// ================================
const addWeeklyClass = async (req, res) => {
    try {
        const { day, classes } = req.body;

        if (!day || !classes || classes.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Day and classes required"
            });
        }

        let exist = await WeeklyClass.findOne({
            day: { $regex: new RegExp(`^${day}$`, "i") }
        });

        if (exist) {
            exist.classes.push(...classes);
            await exist.save();
        } else {
            await WeeklyClass.create({ day, classes });
        }

        // 🔥 IMPORTANT FIX
        await autoCopyTodayClass();

        return res.status(200).json({
            success: true,
            message: "Weekly updated successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ================================
// ✅ DELETE WEEKLY
// ================================
const deleteWeeklyClass = async (req, res) => {
    try {
        const { day } = req.params;

        await WeeklyClass.findOneAndDelete({
            day: { $regex: new RegExp(`^${day}$`, "i") }
        });

        // 🔥 IMPORTANT FIX
        await autoCopyTodayClass();

        return res.status(200).json({
            success: true,
            message: "Deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ================================
// ✅ GET WEEKLY
// ================================
const getWeeklyClasses = async (req, res) => {
    try {
        const weekly = await WeeklyClass.find();

        return res.status(200).json({
            success: true,
            weeklyclass: weekly
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ================================
// ✅ GET TODAY CLASS (FIXED)
// ================================
const TodayClass = async (req, res) => {
    try {
        const todayDate = new Date().toDateString();

        let today = await DailyClass.findOne({ date: todayDate });

        // 🔥 IF NOT EXIST → CREATE THEN FETCH AGAIN
        if (!today) {
            await autoCopyTodayClass();
            today = await DailyClass.findOne({ date: todayDate });
        }

        if (!today) {
            return res.status(404).json({
                success: false,
                message: "No today class found"
            });
        }

        return res.status(200).json({
            success: true,
            todayclass: today
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ================================
// ✅ ADD CLASS (TEACHER)
// ================================
const addTodayClassItem = async (req, res) => {
    try {
        const todayDate = new Date().toDateString();

        const updated = await DailyClass.findOneAndUpdate(
            { date: todayDate },
            { $push: { classes: { ...req.body, isModified: true } } },
            { new: true }
        );

        return res.json({ success: true, data: updated });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// ================================
// ✅ UPDATE CLASS
// ================================
const updateTodayClassItem = async (req, res) => {
    try {
        const { id } = req.params;

        const todayDate = new Date().toDateString();

        const updated = await DailyClass.findOneAndUpdate(
            { date: todayDate, "classes._id": id },
            { $set: { ...Object.fromEntries(
                Object.entries(req.body).map(([k,v]) => [`classes.$.${k}`, v])
            ), "classes.$.isModified": true } },
            { new: true }
        );

        return res.json({ success: true, data: updated });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// ================================
// ✅ DELETE CLASS
// ================================
const deleteTodayClassItem = async (req, res) => {
    try {
        const { id } = req.params;

        const todayDate = new Date().toDateString();

        const updated = await DailyClass.findOneAndUpdate(
            { date: todayDate },
            { $pull: { classes: { _id: id } } },
            { new: true }
        );

        return res.json({ success: true, data: updated });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


module.exports = {
    addWeeklyClass,
    deleteWeeklyClass,
    getWeeklyClasses,
    TodayClass,
    addTodayClassItem,
    updateTodayClassItem,
    deleteTodayClassItem
};