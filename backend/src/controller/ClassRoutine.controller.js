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
                message: "Day and classes are required"
            });
        }

        const exist = await WeeklyClass.findOne({
            day: { $regex: new RegExp(`^${day}$`, "i") }
        });

        if (exist) {
            return res.status(400).json({
                success: false,
                message: "Weekly class already exists"
            });
        }

        const data = await WeeklyClass.create({ day, classes });

        await autoCopyTodayClass(); // 🔥 sync

        return res.status(201).json({
            success: true,
            message: "Weekly class added",
            data
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to add weekly class",
            error: error.message
        });
    }
};


// ================================
// ✅ DELETE WEEKLY
// ================================
const deleteWeeklyClass = async (req, res) => {
    try {
        const { day } = req.params;

        if (!day) {
            return res.status(400).json({
                success: false,
                message: "Day parameter required"
            });
        }

        const deleted = await WeeklyClass.findOneAndDelete({
            day: { $regex: new RegExp(`^${day}$`, "i") }
        });

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Weekly class not found"
            });
        }

        await autoCopyTodayClass(); // 🔥 sync

        return res.status(200).json({
            success: true,
            message: "Weekly class deleted"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to delete weekly class",
            error: error.message
        });
    }
};


// ================================
// ✅ GET TODAY CLASS
// ================================
const TodayClass = async (req, res) => {
    try {
        await autoCopyTodayClass();

        const todayDate = new Date().toDateString();

        const today = await DailyClass.findOne({ date: todayDate });

        if (!today) {
            return res.status(404).json({
                success: false,
                message: "No today class found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Today class fetched",
            todayclass: today
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch today class",
            error: error.message
        });
    }
};


// ================================
// ✅ ADD CLASS (TEACHER)
// ================================
const addTodayClassItem = async (req, res) => {
    try {
        const { subject, teacher, time, type } = req.body;

        if (!subject || !teacher || !time || !type) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const todayDate = new Date().toDateString();

        const updated = await DailyClass.findOneAndUpdate(
            { date: todayDate },
            {
                $push: {
                    classes: {
                        subject,
                        teacher,
                        time,
                        type,
                        isModified: true
                    }
                }
            },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Today class not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Class added",
            data: updated
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to add class",
            error: error.message
        });
    }
};


// ================================
// ✅ UPDATE CLASS
// ================================
const updateTodayClassItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { subject, teacher, time, type } = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Class ID required"
            });
        }

        const todayDate = new Date().toDateString();

        const updated = await DailyClass.findOneAndUpdate(
            { date: todayDate, "classes._id": id },
            {
                $set: {
                    "classes.$.subject": subject,
                    "classes.$.teacher": teacher,
                    "classes.$.time": time,
                    "classes.$.type": type,
                    "classes.$.isModified": true
                }
            },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Class not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Class updated",
            data: updated
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to update class",
            error: error.message
        });
    }
};


// ================================
// ✅ DELETE CLASS
// ================================
const deleteTodayClassItem = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Class ID required"
            });
        }

        const todayDate = new Date().toDateString();

        const updated = await DailyClass.findOneAndUpdate(
            { date: todayDate },
            {
                $pull: {
                    classes: { _id: id }
                }
            },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Class not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Class deleted",
            data: updated
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to delete class",
            error: error.message
        });
    }
};


module.exports = {
    addWeeklyClass,
    deleteWeeklyClass,
    TodayClass,
    addTodayClassItem,
    updateTodayClassItem,
    deleteTodayClassItem
};