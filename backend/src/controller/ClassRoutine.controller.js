const weeklyClass = require("../model/WeeklyClasses.model");
const DailyClass = require("../model/DailyClass.model");
const mongoose = require("mongoose");
const Studentmodel = require("../model/StudentUser.model");
const Teachermodel = require("../model/TeacherUser.model");
const Adminmodel = require("../model/AdminUser.model");
const sendNotification =
    require("../utils/sendNotification");

const { sendMail } = require("../utils/sendMail");


const getAllEmails = async () => {

    const students = await Studentmodel.find({}, "email");

    const teachers = await Teachermodel.find({}, "email");

    const admins = await Adminmodel.find({}, "email");

    return [

        ...students.map(user => user.email),

        ...teachers.map(user => user.email),

        ...admins.map(user => user.email),

    ];
};

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
            await sendNotification({

                title: "Weekly Routine Updated 📚",

                message:
                    `New classes added for ${day}`,

            })




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

        await sendNotification({

            title: "Weekly Routine Added 📚",

            message:
                `Weekly routine added for ${day}`,

        });





        res.status(201).json({
            message: "Class added successfully",
            weeklyclass: {
                ...weeklyclass._doc,
                day: formatDay(weeklyclass.day)
            }
        });
        const emails = await getAllEmails();

        try {
            sendMail(

                emails,

                "weekly Routine added ",

                `weekly class routine added successfully, day - ${day}, Please check now `

            );
        } catch (error) {
            console.log("error" + error)

        }
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
        await sendNotification({

            title: "Weekly Routine Deleted ❌",

            message:
                `${day} routine deleted`,

        });


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
        await sendNotification({

            title: "Weekly Routine Updated ✏️",

            message:
                `${day} routine updated`,

        });


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

        const emails = await getAllEmails();

        try {
            sendMail(

                emails,

                "weekly Routine Updated ",

                `weekly class routine updated successfully, day - ${day}, Please check now `

            );
        } catch (error) {
            console.log("error" + error)
        }

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

        const todayDate = today.toLocaleDateString("en-CA", {
            timeZone: "Asia/Kolkata"
        });
        // console.log("DATE:", todayDate);
        // console.log("DAY:", dayName);

        const dayName = today.toLocaleString("en-US", {
            weekday: "long",
            timeZone: "Asia/Kolkata"
        }).toLowerCase();

        // 🔥 delete old data
        await DailyClass.deleteMany({
            date: { $ne: todayDate }
        });

        const existing = await DailyClass.findOne({ date: todayDate });

        if (existing) {
            return res.status(200).json({
                message: "Today's classes (from daily)",
                _id: existing._id,
                day: existing.day.charAt(0).toUpperCase() + existing.day.slice(1),
                classes: existing.classes
            });
        }

        const weekly = await weeklyClass.findOne({ day: dayName });

        if (!weekly) {
            return res.status(404).json({ message: "No class found for today" });
        }

        const daily = await DailyClass.create({
            day: dayName,
            date: todayDate,
            classes: weekly.classes
        });

        res.status(200).json({
            message: "Today's classes generated",
            _id: daily._id,
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

const addDailyClass = async (req, res) => {
    try {
        let { classes } = req.body;

        const today = new Date();

        const dayName = today.toLocaleString("en-US", {
            weekday: "long",
            timeZone: "Asia/Kolkata"
        }).toLowerCase();

        const todayDate = today.toLocaleDateString("en-CA", {
            timeZone: "Asia/Kolkata"
        });

        // ✅ validation
        if (!classes || classes.length === 0) {
            return res.status(400).json({ message: "Classes are required" });
        }

        // ✅ class validation + remarks support
        for (let cls of classes) {
            if (!cls.subject || !cls.teacher || !cls.type || !cls.time) {
                return res.status(400).json({
                    message: "Subject, teacher, type and time are required"
                });
            }

            // optional remarks
            if (!cls.remarks) {
                cls.remarks = "Extra";
            }
        }

        // ✅ find today's data ONLY by date
        let existing = await DailyClass.findOne({ date: todayDate });

        if (existing) {
            // ✅ duplicate check
            const isDuplicate = existing.classes.some(existingCls =>
                classes.some(newCls =>
                    existingCls.subject === newCls.subject &&
                    existingCls.time === newCls.time
                )
            );

            if (isDuplicate) {
                return res.status(400).json({
                    message: "Duplicate class found for today"
                });
            }

            // ✅ add new classes
            existing.classes.push(...classes);
            await existing.save();
            await sendNotification({

                title: "Extra Class Added 📚",

                message:
                    `New extra class added today`,

            });

            // ✅ MAIL
            const emails = await getAllEmails();

            try {

                sendMail(
                    emails,
                    "New extra class Added today",
                    `A class added successfully, day - ${dayName}, Please check now `
                );

            } catch (error) {

                console.log("MAIL ERROR:", error)

            }



            return res.status(200).json({
                message: "Class added to today's schedule",
                dailyClass: {
                    ...existing._doc,
                    day: existing.day.charAt(0).toUpperCase() + existing.day.slice(1)
                }
            });

        }

        // ✅ যদি আজকের data না থাকে → নতুন create
        const daily = await DailyClass.create({
            day: dayName,
            date: todayDate,
            classes
        });
        await sendNotification({

            title: "Today's Class Added 📚",

            message:
                "Today's class schedule created",

        });


        res.status(201).json({
            message: "Today's class created and added",
            dailyClass: {
                ...daily._doc,
                day: dayName.charAt(0).toUpperCase() + dayName.slice(1)
            }
        });


    } catch (error) {
        console.log("ADD DAILY CLASS ERROR:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};
const editDailyClasses = async (req, res) => {
    try {
        const id = req.params.id?.trim();
        const { classes } = req.body;

        // 🔒 ID check
        if (!mongoose.Types.ObjectId.isValid(id)) {

            return res.status(400).json({ message: "Invalid ID" });

        }

        // 🔒 classes validation
        if (!Array.isArray(classes) || classes.length === 0) {
            return res.status(400).json({ message: "Classes are required" });
        }

        // 🔒 each class validation
        for (let cls of classes) {
            if (!cls.subject || !cls.teacher || !cls.type || !cls.time) {
                return res.status(400).json({
                    message: "All class fields are required"
                });
            }


        }

        // 🔥 update
        const updated = await DailyClass.findByIdAndUpdate(
            id,
            { classes },
            { returnDocument: "after" }
        );

        await sendNotification({

            title: "today class Updated",

            message:
                "Today's class routine updated successfully, check now ",

        });

        const emails = await getAllEmails();

        try {
            sendMail(

                emails,

                "today class Updated",

                "Today's class routine updated successfully, check now "

            );
        } catch (error) {
            console.log("error" + error)
        }



        if (!updated) {
            return res.status(404).json({ message: "Daily class not found" });
        }


        res.status(200).json({
            message: "Classes updated successfully",
            dailyClass: {
                _id: updated._id, // 🔥 IMPORTANT
                day: updated.day.charAt(0).toUpperCase() + updated.day.slice(1),
                classes: updated.classes
            }
        });


    } catch (error) {
        console.log("EDIT DAILY CLASSES ERROR:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

const deleteDailyClass = async (req, res) => {
    try {
        const { classId } = req.params;

        if (!classId) {
            return res.status(400).json({ message: "Class ID required" });
        }
        const today = new Date();
        const todayDate = today.toLocaleDateString("en-CA", {
            timeZone: "Asia/Kolkata"
        });

        // 🔍 find today's doc
        const daily = await DailyClass.findOne({ date: todayDate });

        if (!daily) {
            return res.status(404).json({ message: "No daily class found" });
        }

        // 🔍 find class by _id
        const classItem = daily.classes.id(classId);

        if (!classItem) {
            return res.status(404).json({ message: "Class not found" });
        }

        // 🗑 remove
        classItem.deleteOne();


        await daily.save();
        await sendNotification({

            title: "Today one class will be not held",

            message:
                "Today's class routine updated successfully, One class Deleted, Please check now",

        });



        res.status(200).json({
            message: "Class deleted successfully",
            classes: daily.classes // 🔥 frontend update helpful
        });

        const emails = await getAllEmails();

        try {
            sendMail(

                emails,

                "Today one class will be not held ",

                "Today's class routine updated successfully, One class Deleted, Please check now"

            );
        } catch (error) {
            console.log("error" + error)
        }

    } catch (error) {
        console.log("DELETE DAILY CLASS ERROR:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};
const deleteAllDailyClass = async (req, res) => {
    try {

        const deleted = await DailyClass.deleteMany({});
        await sendNotification({

            title: "All Classes Reset ",

            message:
                "Today's class routine updated successfully. All classes reset.",

        });
        // ✅ response FIRST
        res.status(200).json({
            message: "All daily data deleted successfully",
            deletedCount: deleted.deletedCount
        });

        // ✅ mail async background
        try {

            const emails = await getAllEmails();

            if (emails.length > 0) {

                sendMail(
                    emails,
                    "Daily Routine Reset",
                    "Today's class routine updated successfully. All classes reset."
                );

            }

        } catch (mailError) {

            console.log("MAIL ERROR:", mailError.message);

        }

    } catch (error) {

        console.log("DELETE DAILY ALL ERROR:", error);

        return res.status(500).json({
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
    getDailyClass,
    addDailyClass,
    editDailyClasses,
    deleteDailyClass,
    deleteAllDailyClass



};