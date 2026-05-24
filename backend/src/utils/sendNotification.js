const axios = require("axios");
require("dotenv").config({
    path: "./.env"
});

const sendNotification = async ({
  title,
  message,
}) => {

  try {

    const response = await axios.post(

      "https://api.onesignal.com/notifications?c=push",

      {

        app_id:
          process.env.ONESIGNAL_APP_ID,

        included_segments: ["All"],

        headings: {
          en: title,
        },

        contents: {
          en: message,
        },

      },

      {

        headers: {

          Authorization:
            `Basic ${process.env.ONESIGNAL_REST_API_KEY}`,

          "Content-Type":
            "application/json",

        },

      }

    );

    console.log(
      "Notification Sent:",
      response.data
    );

  } catch (error) {

    console.log(
      error.response?.data || error.message
    );

  }

};

module.exports = sendNotification;