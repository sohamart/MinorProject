const mongoose = require('mongoose');

const StudentUser = new mongoose.Schema({
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
    trade : {
        type: String,
        enum: ["CST", "CE" , "ETC"],
        required: true,
    },
    sem : {
        type: String,
        enum:["1st", "2nd", "3rd", "4th", "5th", "6th"],
        required: true,
    },


},
{
    timestamps: true
});

const Studentmodel = mongoose.model('Student', StudentUser);

module.exports = Studentmodel;