const weeklyClass = require("../model/WeeklyClasses.model");
const dailyClass = require("../model/DailyClass.model");


// ==========================
// COMMON RESPONSE HANDLER
// ==========================
const success = (res, message, data = null, status = 200) => {
    return res.status(status).json({
        success: true,
        message,
        data
    });
};

const error = (res, message = "Something went wrong", status = 500) => {
    return res.status(status).json({
        success: false,
        message
    });
};



// ==========================
// WEEKLY CLASS CONTROLLER
// ==========================

// ADD WEEKLY
const addWeeklyClass = async (req, res) => {
    try {
        const { day, classes } = req.body;

        if (!day || !classes || !Array.isArray(classes)) {
            return error(res, "Invalid input", 400);
        }

        const exist = await weeklyClass.findOne({ day: day.toLowerCase() });
        if (exist) {
            return error(res, "Day already exists", 400);
        }

        const newData = await weeklyClass.create({
            day: day.toLowerCase(),
            classes
        });

        return success(res, "Weekly class added", newData, 201);

    } catch (err) {
        console.error(err);
        return error(res);
    }
};


// EDIT WEEKLY (NO day change)
const editWeeklyClass = async (req, res) => {
    try {
        const { id } = req.params;
        const { classes } = req.body;

        if (!classes || !Array.isArray(classes)) {
            return error(res, "Invalid classes data", 400);
        }

        const updated = await weeklyClass.findByIdAndUpdate(
            id,
            { classes },
            { new: true }
        );

        if (!updated) return error(res, "Weekly data not found", 404);

        return success(res, "Weekly updated", updated);

    } catch (err) {
        console.error(err);
        return error(res);
    }
};


// DELETE WEEKLY
const deleteWeeklyClass = async (req, res) => {
    try {
        const { day } = req.params;

        const deleted = await weeklyClass.findOneAndDelete({
            day: day.toLowerCase()
        });

        if (!deleted) return error(res, "Day not found", 404);

        return success(res, "Weekly deleted");

    } catch (err) {
        console.error(err);
        return error(res);
    }
};


// ==========================
// GET WEEKLY DATA
// ==========================

// GET ALL WEEKLY DATA
const getAllWeeklyClass = async (req, res) => {
    try {
        const data = await weeklyClass.find().sort({ day: 1 });

        return res.status(200).json({
            success: true,
            message: "All weekly classes fetched",
            data
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch weekly data"
        });
    }
};



// GET SINGLE DAY WEEKLY
const getWeeklyByDay = async (req, res) => {
    try {
        const { day } = req.params;

        const data = await weeklyClass.findOne({
            day: day.toLowerCase()
        });

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Day not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Weekly class fetched",
            data
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Error fetching weekly data"
        });
    }
};




// ==========================
// TODAY CLASS CONTROLLER
// ==========================

// LAZY AUTO COPY FUNCTION (Railway safe)
const ensureTodayData = async () => {
    const today = new Date();
    const todayDate = today.toDateString();
    const dayName = today.toLocaleString("en-US", { weekday: "long" }).toLowerCase();

    let data = await dailyClass.findOne({ date: todayDate });

    if (!data) {
        // delete old
        await dailyClass.deleteMany({});

        const weekly = await weeklyClass.findOne({ day: dayName });

        if (!weekly) return null;

        data = await dailyClass.create({
            date: todayDate,
            day: dayName,
            classes: weekly.classes
        });
    }

    return data;
};



// GET TODAY
const getTodayClass = async (req, res) => {
    try {
        const data = await ensureTodayData();

        if (!data) return error(res, "No class found for today", 404);

        return success(res, "Today class fetched", data);

    } catch (err) {
        console.error(err);
        return error(res);
    }
};



// ADD TODAY CLASS (multiple)
const addTodayClass = async (req, res) => {
    try {
        let { classes } = req.body;

        if (!classes) {
            return error(res, "No classes provided", 400);
        }

        // support single object
        if (!Array.isArray(classes)) {
            classes = [classes];
        }

        const data = await ensureTodayData();
        if (!data) return error(res, "No base data", 404);

        for (let newClass of classes) {

            // 🔥 check duplicate
            const isDuplicate = data.classes.some(c => 
                c.time === newClass.time || 
                (c.subject === newClass.subject && c.time === newClass.time)
            );

            if (isDuplicate) {
                return error(res, `Class conflict at ${newClass.time}`, 400);
            }

            data.classes.push(newClass);
        }

        await data.save();

        return success(res, "Classes added", data);

    } catch (err) {
        console.error(err);
        return error(res);
    }
};
const editTodayClass = async (req, res) => {
    try {
        const index = parseInt(req.params.index); // 🔥 FIX
        const updatedClass = req.body;

        const data = await ensureTodayData();
        if (!data) return error(res, "No data", 404);

        if (isNaN(index) || index < 0 || index >= data.classes.length) {
            return error(res, "Invalid index", 400);
        }

        data.classes[index] = updatedClass;
        await data.save();

        return success(res, "Class updated", data);

    } catch (err) {
        console.error(err);
        return error(res);
    }
};



// DELETE TODAY CLASSconst 
deleteTodayClass = async (req, res) => {
    try {
        const index = parseInt(req.params.index); // ✅ FIX

        const data = await ensureTodayData();
        if (!data) return error(res, "No data", 404);

        if (isNaN(index) || index < 0 || index >= data.classes.length) {
            return error(res, "Invalid index", 400);
        }

        data.classes.splice(index, 1);
        await data.save();

        return success(res, "Class deleted", data);

    } catch (err) {
        console.error("DELETE ERROR:", err);
        return error(res);
    }
}



// ==========================
module.exports = {
    addWeeklyClass,
    editWeeklyClass,
    deleteWeeklyClass,
    getTodayClass,
    addTodayClass,
    editTodayClass,
    deleteTodayClass,
    getAllWeeklyClass,
    getWeeklyByDay

};