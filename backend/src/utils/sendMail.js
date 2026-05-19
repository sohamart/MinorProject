const nodemailer = require("nodemailer");
require("dotenv").config({
    path: "./.env"
});


const transporter = nodemailer.createTransport({

    host: "smtp-relay.brevo.com",

    port: 587,

    secure: false,

    auth: {
        user: process.env.BREVO_USER,

        pass: process.env.BREVO_PASS,
    },

});

const sendMail = async (emails, subject, text) => {

    try {



        await transporter.sendMail({

            from: `"Kalna Polytechnic Class Routine" <sohamduttabwn@gmail.com>`,

            to: emails,

            subject,

            html: `

                <div style="
                    font-family: Arial;
                    background:#f5f5f5;
                    padding:20px;
                ">

                    <div style="
                        max-width:600px;
                        margin:auto;
                        background:white;
                        border-radius:10px;
                        overflow:hidden;
                    ">

                        <div style="
                            background:black;
                            color:white;
                            text-align:center;
                            padding:20px;
                        ">

                            <h1>Class Routine</h1>

                        </div>

                        <div style="padding:30px;">

                            <h2>${subject}</h2>

                            <p>${text}</p>

                            <a href="https://classroutinetime.vercel.app"
                               style="
                                display:inline-block;
                                padding:12px 20px;
                                background:black;
                                color:white;
                                text-decoration:none;
                                border-radius:6px;
                               ">

                               Open App

                            </a>

                        </div>

                    </div>

                </div>

                `,

        });





        console.log("ALL EMAILS SENT SUCCESSFULLY");

    } catch (error) {

        console.log("MAIL ERROR:", error);

    }
};

module.exports = { sendMail };