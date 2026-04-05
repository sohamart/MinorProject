const weeklyClass = require("../model/WeeklyClasses.model");
const DailyClass = require("../model/DailyClass.model")




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



module.exports = {
    WeeklyClassGet,
    addWeeklyClass

}