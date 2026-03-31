const mongoose = require('mongoose');


const TeacherUser = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    subject : {
        type: String,
        required: true,

    }
});

const Teachermodel = mongoose.model('Teacher', TeacherUser);

module.exports = Teachermodel;