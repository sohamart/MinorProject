const Studentuser = require('../model/StudentUser.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Adminuser = require('../model/AdminUser.model');
const Teacheruser = require('../model/TeacherUser.model');
const Studentmodel = require("../model/StudentUser.model");
const Teachermodel = require("../model/TeacherUser.model");
const Adminmodel = require("../model/AdminUser.model");
const sendNotification =
    require("../utils/sendNotification");
require("dotenv").config({
    path: "./.env"
});

const { sendMail } = require("../utils/sendMail");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID
);






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

const isProduction = process.env.NODE_ENV === "production";


// student user login logout AND register features

const registerStudent = async (req, res) => {
    let { name, email, password, trade, sem, phone } = req.body;
    email = email.trim().toLowerCase();

    const isStudentExist = await Studentuser.findOne({ email });

    if (isStudentExist) {
        return res.status(400).json({ message: 'Student already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const studentuserdata = await Studentuser.create({ name, phone, email, password: hashedPassword, trade, sem });
        await sendNotification({

            title: "New Student Registered",

            message:
                `New student registered: ${studentuserdata.name}`,

        })
        res.status(201).json({
            message: 'Student registered successfully',
            Studentuser: {
                name: studentuserdata.name,
                email: studentuserdata.email,
                trade: studentuserdata.trade,
                sem: studentuserdata.sem,
                phone: studentuserdata.phone,
            }
        });
        const emails = await getAllEmails();

        try {
            sendMail(

                emails,

                "New Student Registered",

                `New Student has been registered now, name - ${studentuserdata.name}, Please check now `

            );
        } catch (error) {
            console.log("error" + error)
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' + error });
    }
};

const loginStudent = async (req, res) => {
    let { email, password } = req.body;
    email = email.trim().toLowerCase();

    try {
        const studentuserdata = await Studentuser.findOne({ email });
        if (!studentuserdata) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, studentuserdata.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMedian = req.headers["user-agent"]?.includes("C.R");
        const isDesktop = req.headers["user-agent"]?.includes("Electron");



        const token = jwt.sign({ id: studentuserdata._id }, process.env.JWT_SECRET, {
            expiresIn: isMedian || isDesktop ? "10d" : "1d"
        });;

        res.cookie("token", token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            maxAge: (isMedian || isDesktop)
            ? 10 * 24 * 60 * 60 * 1000 // 10 days
            : 24 * 60 * 60 * 1000 // 1 day
        });

        res.status(201).json({
            message: 'Student logged in successfully',
            Studentuser: {
                name: studentuserdata.name,
                email: studentuserdata.email,
                trade: studentuserdata.trade,
                sem: studentuserdata.sem,
                phone: studentuserdata.phone,
                token: token
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' + error });
    }
};

const logoutStudent = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax"
        });
        res.status(200).json({ message: 'Logged out successfully' });
    } catch {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const findstudent = async (req, res) => {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const studentuserdata = await Studentuser.findById(decoded.id);

        if (!studentuserdata) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json(studentuserdata);
    } catch {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

const deleteStudent = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedStudent = await Studentuser.findByIdAndDelete(id);
        if (!student) {
            res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json({
            message: 'Student deleted successfully',
            deletedStudent
        });
        const emails = await getAllEmails();

        try {
            sendMail(

                emails,

                "one Student left",

                `admin has been deleted a student now, name - ${deletedStudent.name}, Please check now `

            );
        } catch (error) {
            console.log("error" + error)
        }
    } catch {
        res.status(500).json({ message: 'Internal server error' });


    }
}







// ================= ADMIN =================

const registerAdmin = async (req, res) => {
    let { name, email, password } = req.body;
    email = email.trim().toLowerCase();
    try {
        const isAdminExist = await Adminuser.findOne({ email });
        if (isAdminExist) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const adminuserdata = await Adminuser.create({ name, email, password: hashedPassword });

        const token = jwt.sign({ id: adminuserdata._id }, process.env.JWT_SECRET);

        await sendNotification({

            title: "New Admin Registered",

            message:
                `New admin registered: ${adminuserdata.name}`,

        })

        res.cookie("token", token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax"
        });

        res.status(201).json({
            message: 'Admin registered successfully',
            adminuserdata: {
                name: adminuserdata.name,
                email: adminuserdata.email,
                token: token
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' + error });
    }
};

const loginAdmin = async (req, res) => {
    let { email, password } = req.body;
    email = email.trim().toLowerCase();
    try {
        const adminuserdata = await Adminuser.findOne({ email });
        if (!adminuserdata) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, adminuserdata.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMedian = req.headers["user-agent"]?.includes("C.R");
        const isDesktop = req.headers["user-agent"]?.includes("Electron");

        const token = jwt.sign({ id: adminuserdata._id }, process.env.JWT_SECRET, {
            expiresIn: isMedian || isDesktop ? "10d" : "1d"
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
             maxAge: (isMedian || isDesktop)
            ? 10 * 24 * 60 * 60 * 1000 // 10 days
            : 24 * 60 * 60 * 1000 // 1 day
        });

        res.status(201).json({
            message: 'Admin logged in successfully',
            adminuserdata: {
                name: adminuserdata.name,
                email: adminuserdata.email,
                token: token
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' + error });
    }
};

// 🔥 FIXED
const logoutAdmin = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax"
        });
        res.status(200).json({ message: 'Logged out successfully' });
    } catch {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const findadmin = async (req, res) => {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const adminuserdata = await Adminuser.findById(decoded.id);

        if (!adminuserdata) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json(adminuserdata);
    } catch {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

// ================= TEACHER =================

const registerTeacher = async (req, res) => {
    let { name, email, password, subject, phone } = req.body;
    email = email.trim().toLowerCase();
    try {
        const isTeacherExist = await Teacheruser.findOne({ email });
        if (isTeacherExist) {
            return res.status(400).json({ message: 'Teacher already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const teacheruserdata = await Teacheruser.create({ name, phone, email, password: hashedPassword, subject });

        await sendNotification({

            title: "New Teacher Registered",

            message:
                `New teacher registered: ${teacheruserdata.name}`,

        })

        res.status(201).json({
            message: 'Teacher registered successfully',
            teacheruserdata: {
                name: teacheruserdata.name,
                email: teacheruserdata.email,
                subject: teacheruserdata.subject,
                phone: teacheruserdata.phone,
            }
        });
        const emails = await getAllEmails();

        try {
            sendMail(

                emails,

                "New Teacher Registered",

                `New Faculty has been registered now, name - ${teacheruserdata.name}, Please check now `

            );
        } catch (error) {
            console.log("error" + error)
        }

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' + error });
    }
};

const loginTeacher = async (req, res) => {
    let { email, password } = req.body;
    email = email.trim().toLowerCase();
    try {
        const teacheruserdata = await Teacheruser.findOne({ email });

        if (!teacheruserdata) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, teacheruserdata.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMedian = req.headers["user-agent"]?.includes("C.R");
        const isDesktop = req.headers["user-agent"]?.includes("Electron");

        const token = jwt.sign({ id: teacheruserdata._id }, process.env.JWT_SECRET, {
            expiresIn: isMedian || isDesktop ? "10d" : "1d"
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
             maxAge: (isMedian || isDesktop)
            ? 10 * 24 * 60 * 60 * 1000 // 10 days
            : 24 * 60 * 60 * 1000  // 1 day
        });

        res.status(201).json({
            message: 'Teacher logged in successfully',
            teacheruserdata: {
                name: teacheruserdata.name,
                email: teacheruserdata.email,
                subject: teacheruserdata.subject,
                phone: teacheruserdata.phone,
                token: token
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' + error });
    }
};

// 🔥 FIXED
const logoutTeacher = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax"
        });
        res.status(200).json({ message: 'Logged out successfully' });
    } catch {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const findteacher = async (req, res) => {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const Teacheruserdata = await Teacheruser.findById(decoded.id);

        if (!Teacheruserdata) {
            return res.status(404).json({ message: 'Please login as a Teacher' });
        }

        res.status(200).json(Teacheruserdata);
    } catch {
        res.status(401).json({ message: 'Unauthorized ' });
    }
};

const deleteTeacher = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTeacher = await Teacheruser.findByIdAndDelete(id);
        if (!teacher) {
            res.status(404).json({ message: 'Teacher not found' });
        }
        res.status(200).json({
            message: 'Teacher deleted successfully',
            deletedTeacher
        });
        const emails = await getAllEmails();

        try {
            sendMail(

                emails,

                "one Teacher left",

                `one Faculty has been left, name - ${deletedTeacher.name},Please check now `

            );
        } catch (error) {
            console.log("error" + error)
        }
    } catch {
        res.status(500).json({ message: 'Internal server error' });
    }

}



const getAllStudent = async (req, res) => {
    try {
        const studentuserdata = await Studentuser.find();


        if (!studentuserdata) {
            return res.status(404).json({ message: 'No students found' });
        }

        res.status(200).json({
            message: 'Students found successfully',
            studentuserdata: studentuserdata
        });



    } catch {
        res.status(500).json({ message: 'Internal server error' });
    }
}
const getAllteacher = async (req, res) => {
    try {
        const teacheruserdata = await Teacheruser.find();
        if (!teacheruserdata) {
            return res.status(404).json({ message: 'No teachers found' });
        }

        res.status(200).json({
            message: 'Teachers found successfully',
            teacheruserdata: teacheruserdata
        });
    }
    catch {
        res.status(500).json({ message: 'Internal server error' });
    }

}
const googleLogin = async (req, res) => {
    try {

        const { credential } = req.body;

        if (!credential) {
            return res.status(400).json({
                message: "Google token missing"
            });
        }

        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();

        if (!payload.email_verified) {
            return res.status(401).json({
                message: "Google email is not verified"
            });
        }

        const email = payload.email.toLowerCase().trim();

        let user = null;
        let role = "";

        // ================= ADMIN =================
        user = await Adminuser.findOne({ email });

        if (user) {
            role = "admin";
        }

        // ================= TEACHER =================
        if (!user) {
            user = await Teacheruser.findOne({ email });

            if (user) {
                role = "teacher";
            }
        }

        // ================= STUDENT =================
        if (!user) {
            user = await Studentuser.findOne({ email });

            if (user) {
                role = "student";
            }
        }

        if (!user) {
            return res.status(401).json({
                message: "Account not found. Please register first."
            });
        }

        const isMedian = req.headers["user-agent"]?.includes("C.R");
        const isDesktop = req.headers["user-agent"]?.includes("Electron");

        const token = jwt.sign(
            {
                id: user._id,
                role: role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: isMedian || isDesktop ? "10d" : "1d"
            }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            maxAge: (isMedian || isDesktop)
                ? 10 * 24 * 60 * 60 * 1000
                : 24 * 60 * 60 * 1000
        });

        // ================= STUDENT RESPONSE =================
        if (role === "student") {

            return res.status(201).json({
                message: "Student logged in successfully",
                Studentuser: {
                    name: user.name,
                    email: user.email,
                    trade: user.trade,
                    sem: user.sem,
                    phone: user.phone,
                    token: token
                }
            });

        }

        // ================= TEACHER RESPONSE =================
        if (role === "teacher") {

            return res.status(201).json({
                message: "Teacher logged in successfully",
                teacheruserdata: {
                    name: user.name,
                    email: user.email,
                    subject: user.subject,
                    phone: user.phone,
                    token: token
                }
            });

        }

        // ================= ADMIN RESPONSE =================
        if (role === "admin") {

            return res.status(201).json({
                message: "Admin logged in successfully",
                adminuserdata: {
                    name: user.name,
                    email: user.email,
                    token: token
                }
            });

        }

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Google Login Failed"
        });

    }
};


module.exports = {
    registerStudent,
    loginStudent,
    
    registerAdmin,
    loginAdmin,
    registerTeacher,
    loginTeacher,
    logoutStudent,
    logoutAdmin,
    logoutTeacher,
    findstudent,
    findteacher,
    findadmin,
    getAllStudent,
    getAllteacher,
    deleteStudent,
    deleteTeacher,
    googleLogin


};