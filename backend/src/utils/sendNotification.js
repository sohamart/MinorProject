const axios = require("axios");
require("dotenv").config({
    path: "./.env"
});

const NotificationModel = require("../model/NotificationBox.model");
const sendNotification = async ({
  title,
  message,
}) => {

    console.log(process.env.ONESIGNAL_APP_ID);

console.log(process.env.ONESIGNAL_REST_API_KEY);

  try {

    await NotificationModel.create({
      title,
      message,
    });

    const response = await axios({

      method: "POST",

      url: "https://onesignal.com/api/v1/notifications",

      headers: {

        Authorization:
          `Basic ${process.env.ONESIGNAL_REST_API_KEY}`,

        "Content-Type":
          "application/json",

      },

      data: {

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

    });

    console.log(
      "Notification Sent:",
      response.data
    );

  } catch (error) {

    console.log(

      error.response?.data ||
      error.message

    );

  }

};

module.exports = sendNotification;