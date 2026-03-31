const Studentuser = require('../model/StudentUser.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Adminuser = require('../model/AdminUser.model');
const Teacheruser = require('../model/TeacherUser.model');

const isProduction = process.env.NODE_ENV === "production";

// student user login logout AND register features

const registerStudent = async (req, res) => {
    const { name, email, password, trade, sem } = req.body;

    const isStudentExist = await Studentuser.findOne({ email });

    if (isStudentExist) {
        return res.status(400).json({ message: 'Student already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const studentuserdata = await Studentuser.create({ name, email, password: hashedPassword, trade, sem });

        const token = jwt.sign({ id: studentuserdata._id }, process.env.JWT_SECRET);

        res.cookie("token", token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax"
        });

        res.status(201).json({
            message: 'Student registered successfully',
            Studentuser: {
                name: studentuserdata.name,
                email: studentuserdata.email,
                trade: studentuserdata.trade,
                sem: studentuserdata.sem,
                token: token
            }
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' + error });
    }
};

const loginStudent = async (req, res) => {
    const { email, password } = req.body;

    try {
        const studentuserdata = await Studentuser.findOne({ email });
        if (!studentuserdata) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, studentuserdata.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: studentuserdata._id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax"
        });

        res.status(201).json({
            message: 'Student logged in successfully',
            Studentuser: {
                name: studentuserdata.name,
                email: studentuserdata.email,
                trade: studentuserdata.trade,
                sem: studentuserdata.sem,
                token: token
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' + error });
    }
};

// 🔥 FIXED
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

// ================= ADMIN =================

const registerAdmin = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const isAdminExist = await Adminuser.findOne({ email });
        if (isAdminExist) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const adminuserdata = await Adminuser.create({ name, email, password: hashedPassword });

        const token = jwt.sign({ id: adminuserdata._id }, process.env.JWT_SECRET);

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
    const { email, password } = req.body;

    try {
        const adminuserdata = await Adminuser.findOne({ email });
        if (!adminuserdata) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, adminuserdata.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: adminuserdata._id }, process.env.JWT_SECRET);

        res.cookie("token", token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax"
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
    const { name, email, password, subject } = req.body;

    try {
        const isTeacherExist = await Teacheruser.findOne({ email });
        if (isTeacherExist) {
            return res.status(400).json({ message: 'Teacher already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const teacheruserdata = await Teacheruser.create({ name, email, password: hashedPassword, subject });

        const token = jwt.sign({ id: teacheruserdata._id }, process.env.JWT_SECRET);

        res.cookie("token", token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax"
        });

        res.status(201).json({
            message: 'Teacher registered successfully',
            teacheruserdata: {
                name: teacheruserdata.name,
                email: teacheruserdata.email,
                subject: teacheruserdata.subject,
                token: token
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' + error });
    }
};

const loginTeacher = async (req, res) => {
    const { email, password } = req.body;

    try {
        const teacheruserdata = await Teacheruser.findOne({ email });

        if (!teacheruserdata) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, teacheruserdata.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: teacheruserdata._id }, process.env.JWT_SECRET);

        res.cookie("token", token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax"
        });

        res.status(201).json({
            message: 'Teacher logged in successfully',
            teacheruserdata: {
                name: teacheruserdata.name,
                email: teacheruserdata.email,
                subject: teacheruserdata.subject,
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
    findadmin
};