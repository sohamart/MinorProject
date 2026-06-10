const NotificationModel = require("../model/NotificationBox.model");

// Get All Notifications
const getNotifications =
async (req, res) => {

    try {

        const notifications =
        await NotificationModel
        .find()
        .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            notifications
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// Get Notification Count
const getNotificationCount =
async (req, res) => {

    try {

        const count =
        await NotificationModel
        .countDocuments({
            isRead: false
        });

        res.status(200).json({
            success: true,
            count
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// Mark All Read
const markAllRead =
async (req, res) => {

    try {

        await NotificationModel
        .updateMany(
            {},
            {
                isRead: true
            }
        );

        res.status(200).json({
            success: true,
            message: "All notifications marked as read"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {

    getNotifications,
    getNotificationCount,
    markAllRead

};