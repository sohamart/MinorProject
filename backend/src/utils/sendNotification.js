const axios = require("axios");
require("dotenv").config({
    path: "./.env"
});

const sendNotification = async (title, message) => {

    try {

        const response = await axios.post(

            "https://onesignal.com/api/v1/notifications",

            {

                app_id: process.env.ONESIGNAL_APP_ID,

                included_segments: ["All"],

                headings: {
                    en: title,
                },

                contents: {
                    en: message,
                },

                url: "https://classroutinetime.vercel.app",

            },

            {

                headers: {

                    Authorization: `Basic ${process.env.ONESIGNAL_API_KEY}`,

                    "Content-Type": "application/json",

                },

            }

        );

        console.log("NOTIFICATION SENT");

        console.log(response.data);

    } catch (error) {

        console.log(

            "NOTIFICATION ERROR:",

            error.response?.data || error.message

        );

    }

};

module.exports = { sendNotification };