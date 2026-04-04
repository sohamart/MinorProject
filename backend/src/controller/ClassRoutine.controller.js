const DailyClass = require('../model/DailyClass.model');
const WeeklyClass = require('../model/WeeklyClasses.model');
const autoCopyTodayClass = require('../utils/AutoCopyDailyClass');



const addWeeklyClass = async (req, res) => {    
    const { day, classes } = req.body;
    IsDataExist = await WeeklyClass.findOne({ day });
    if (IsDataExist) {  
        return res.status(400).json({ message: 'data already exists' });
    }
    try{
        const ClassRoutine = await WeeklyClass.create({ day, classes });
        res.status(201).json({
            messege: "class Add Succesfully",
            day: ClassRoutine.day,
            classes: ClassRoutine.classes,
        })
    }
    catch(error){
        res.status(500).json({ message: 'Internal server error' + error });
    }
    
}

const TodayClass = async (req, res) => {
    try {
        autoCopyTodayClass();
        const todayclass = await DailyClass.find();

        if(!todayclass){
            return res.status(400).json({
                message: "today class not found"
            })
        }
        res.status(200).json({
            message: "today class found",
            todayclass

            })
        }catch(error){
            res.status(500).json({ message: 'Internal server error' + error });
        
        }
    }


module.exports = {
    addWeeklyClass,
    TodayClass



}