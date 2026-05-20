const nodemailer = require("nodemailer");
require("dotenv").config({
    path: "./.env"
});

const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {

        user: process.env.EMAIL_USER,

        pass: process.env.EMAIL_PASS,

    },

});

const sendMail = async (emails, subject, text) => {

    try {

        transporter.sendMail({

            from: `"Class Routine" <${process.env.EMAIL_USER}>`,

            bcc: emails,

            subject,

            html: `

                <div style="font-family:Arial;padding:20px">

                    <h2>${subject}</h2>

                    <p>${text}</p>

                    <a href="https://classroutinetime.vercel.app">

                        Open App

                    </a>

                </div>

            `,

        });

        console.log("MAIL SENT");

    } catch (error) {

        console.log("MAIL ERROR:", error);

    }

};

module.exports = { sendMail };