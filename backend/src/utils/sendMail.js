const nodemailer = require("nodemailer");
require("dotenv").config({
    path: "./.env"
});
const transporter = nodemailer.createTransport({

    host: "smtp-relay.brevo.com",

    port: 2525,

    secure: false,

    connectionTimeout: 30000,

    greetingTimeout: 30000,

    socketTimeout: 30000,

    auth: {

        user: process.env.BREVO_EMAIL,

        pass: process.env.BREVO_PASS,

    },

});
const sendMail = async (emails, subject, text) => {

    try {

        if (!emails || emails.length === 0) {
            console.log("No emails");
            return;
        }

        for (const email of emails) {

            try {

                const info = await transporter.sendMail({

                    from: `"Class Routine" <${process.env.SENDER_EMAIL}>`,

                    to: email,

                    subject,

                    html: `

<div style="
    background:#f3f4f6;
    padding:40px 15px;
    font-family:Arial,sans-serif;
">

<div style="
    max-width:700px;
    margin:auto;
    background:#ffffff;
    border-radius:22px;
    overflow:hidden;
    box-shadow:0 10px 35px rgba(0,0,0,0.08);
    border:1px solid #e5e7eb;
">

    <div style="
        background:linear-gradient(135deg,#2563eb,#1d4ed8);
        padding:40px 20px;
        text-align:center;
    ">

        <h1 style="
            color:white;
            margin:0;
            font-size:34px;
            font-weight:700;
        ">
            C.R Time Pro
        </h1>

    </div>

    <div style="
        padding:45px 35px;
        color:#111827;
    ">

        <h2 style="
            font-size:30px;
            margin-bottom:20px;
            color:#2563eb;
        ">
            ${subject}
        </h2>

        <p style="
            font-size:17px;
            color:#4b5563;
            line-height:1.9;
        ">
            ${text}
        </p>

        <div style="text-align:center; margin-top:35px;">

            <a
                href="https://classroutinetime.vercel.app"
                style="
                    display:inline-block;
                    background:#2563eb;
                    color:white;
                    text-decoration:none;
                    padding:16px 34px;
                    border-radius:14px;
                    font-size:17px;
                    font-weight:bold;
                "
            >
                Open Class Routine
            </a>

        </div>

    </div>

</div>

</div>

                    `

                });

                console.log("MAIL SENT:", email);

                await new Promise(resolve =>
                    setTimeout(resolve, 1500)
                );

            } catch (mailError) {

                console.log("FAILED:", email);
                console.log(mailError.message);

            }

        }

    } catch (error) {

        console.log(error);

    }

};


module.exports = { sendMail };