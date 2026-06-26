const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    message: {
        type: String,
        required: true
    },

    isRead: {
        type: Boolean,
        default: false
    },

    createdAt: {
        type: Date,
        default: Date.now,
        expires: 7 * 24 * 60 * 60 // 7 days in seconds
    }

});

module.exports = mongoose.model(
    "Notification",
    NotificationSchema
);