const express = require("express");

const router = express.Router();

const {

    getNotifications,
    getNotificationCount,
    markAllRead

} = require(
    "../controller/Notification.controller"
);


router.get(
    "/notifications/get",
    getNotifications
);

router.get(
    "/notifications/count",
    getNotificationCount
);

router.put(
    "/notifications/read",
    markAllRead
);

module.exports = router;