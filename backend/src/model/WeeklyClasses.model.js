const mongoose = require('mongoose');



const weeklyclass = new mongoose.Schema({
    day: {
        type: String,
        required: true,
    },
    classes: [
        {
        subject: {
            type: String,
            required: true,
        },
        teacher: {
            type: String,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ["theory", "lab"],
            required: true,
        },

        room: {
            type: String,

        },
        }
    ]
}, {
    timestamps: true
});

const weeklyclassmodel = mongoose.model('weeklyclass', weeklyclass);

module.exports = weeklyclassmodel;






