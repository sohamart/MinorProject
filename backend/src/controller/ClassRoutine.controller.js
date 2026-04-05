const weeklyClass = require("../model/WeeklyClasses.model");
const DailyClass = require("../model/DailyClass.model");
const mongoose = require("mongoose");


// ✅ GET
const WeeklyClassGet = async (req, res) => {
    try {
        const weeklyclass = await weeklyClass.find();

        if (!weeklyclass || weeklyclass.length === 0) {
            return res.status(404).json({ message: 'No classes found' });
        }

        res.status(200).json({
            message: 'Classes found successfully',
            weeklyclass
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

        // 🔥 normalize day (important)
        day = day.toLowerCase();

        // ❌ duplicate check
        const exists = await weeklyClass.findOne({ day });
        if (exists) {
            return res.status(400).json({ message: "Day already exists" });
        }

        const weeklyclass = await weeklyClass.create({
            day,
            classes
        });

        res.status(201).json({
            message: 'Class added successfully',
            weeklyclass
        });

    } catch (error) {
        console.log("ADD ERROR:", error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};


// ✅ DELETE
const deleteWeeklyClass = async (req, res) => {
    try {
        let { day } = req.params;

        day = day.toLowerCase(); // 🔥 fix

        const weeklyclass = await weeklyClass.findOneAndDelete({ day });

        if (!weeklyclass) {
            return res.status(404).json({ message: 'Class not found' });
        }

        res.status(200).json({
            message: 'Class deleted successfully',
            weeklyclass
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
            weeklyclass
        });

    } catch (error) {
        console.log("EDIT ERROR:", error);
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
    editWeeklyClass
};