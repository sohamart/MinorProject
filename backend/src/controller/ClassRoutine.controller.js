const weeklyClass = require("../model/WeeklyClasses.model");
const DailyClass = require("../model/DailyClass.model")
const mongoose = require("mongoose");




const WeeklyClassGet = async (req, res) => {
    try {
        const weeklyclass = await weeklyClass.find();
        if (!weeklyclass) {
            return res.status(404).json({ message: 'No classes found' });
        }
        res.status(200).json({
            message: 'Classes found successfully',
            weeklyclass
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }

}

const addWeeklyClass = async (req, res) => {
    try {
        const { day, classes } = req.body;
        const weeklyclass = await weeklyClass.create({ day, classes });
        res.status(201).json({
            message: 'Class added successfully',
            weeklyclass
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
}
const deleteWeeklyClass = async (req, res) => {
    try {
        const { day } = req.params;
        const weeklyclass = await weeklyClass.findOneAndDelete({ day });
        if (!weeklyclass) {
            return res.status(404).json({ message: 'Class not found' });
        }
        res.status(200).json({
            message: 'Class deleted successfully',
            weeklyclass
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
}

const editWeeklyClass = async (req, res) => {
    try {
        const id = req.params.id.trim(); // clean

        const { day, classes } = req.body;

        // ✅ ID VALIDATION
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        const weeklyclass = await weeklyClass.findByIdAndUpdate(
            id,
            { day, classes },
            { new: true }
        );

        // ✅ NOT FOUND FIX
        if (!weeklyclass) {
            return res.status(404).json({ message: "Class not found" });
        }

        res.status(200).json({
            message: "Class updated successfully",
            weeklyclass
        });

    } catch (error) {
        console.log("EDIT ERROR:", error); // 🔥 debug
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


}