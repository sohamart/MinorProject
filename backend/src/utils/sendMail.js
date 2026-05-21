const nodemailer = require("nodemailer");
require("dotenv").config({
    path: "./.env"
});

const transporter = nodemailer.createTransport({

    host: "smtp-relay.brevo.com",

    port: 587,

    secure: false,

    auth: {

        user: process.env.BREVO_EMAIL,

        pass: process.env.BREVO_PASS,

    },

});

const sendMail = async (emails, subject, text) => {

    try {

        const info = await transporter.sendMail({

            from: `"Class Routine" <${process.env.SENDER_EMAIL}>`,

            bcc: Array.isArray(emails)
                ? emails.join(",")
                : emails,

            subject,

            html: `
                <h2>${subject}</h2>
                <p>${text}</p>
            `

        });

        console.log(info.response);

    } catch (error) {

        console.log(error);

    }

};

module.exports = { sendMail };