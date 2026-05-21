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

    <!-- HEADER -->

    <div style="
        background:linear-gradient(135deg,#2563eb,#1d4ed8);
        padding:40px 20px;
        text-align:center;
    ">

        <img
            src='https://cdn-icons-png.flaticon.com/512/3652/3652191.png'
            width="90"
            style="
                background:white;
                padding:12px;
                border-radius:20px;
                margin-bottom:15px;
                box-shadow:0 4px 15px rgba(255,255,255,0.2);
            "
        />

        <h1 style="
            color:white;
            margin:0;
            font-size:34px;
            letter-spacing:1px;
            font-weight:700;
        ">
            CLASS ROUTINE
        </h1>

        <p style="
            color:#dbeafe;
            margin-top:12px;
            font-size:16px;
        ">
            Smart Daily Routine Management System
        </p>

    </div>

    <!-- BODY -->

    <div style="
        padding:45px 35px;
        color:#111827;
    ">

        <h2 style="
            font-size:30px;
            margin-bottom:20px;
            color:#2563eb;
            font-weight:bold;
        ">
            ${subject}
        </h2>

        <p style="
            font-size:17px;
            color:#374151;
            line-height:1.8;
            margin-bottom:28px;
        ">
            Hello Student,
        </p>

        <p style="
            font-size:17px;
            color:#4b5563;
            line-height:1.9;
            margin-bottom:35px;
        ">
            ${text}
        </p>

        <!-- CARD -->

        <div style="
            background:#f9fafb;
            border:1px solid #e5e7eb;
            border-radius:16px;
            padding:25px;
            margin-bottom:35px;
        ">

            <h3 style="
                margin-top:0;
                color:#1d4ed8;
                font-size:22px;
            ">
                Important Notice
            </h3>

            <p style="
                margin-bottom:0;
                color:#4b5563;
                line-height:1.7;
                font-size:15px;
            ">
                Please regularly check your class routine for latest updates, extra classes, cancellations, and schedule changes.
            </p>

        </div>

        <!-- BUTTON -->

        <div style="text-align:center;">

            <a
                href="https://classroutinetime.vercel.app"
                style="
                    display:inline-block;
                    background:linear-gradient(135deg,#2563eb,#1d4ed8);
                    color:white;
                    text-decoration:none;
                    padding:16px 34px;
                    border-radius:14px;
                    font-size:17px;
                    font-weight:bold;
                    box-shadow:0 8px 20px rgba(37,99,235,0.3);
                "
            >
                Open Class Routine
            </a>

        </div>

    </div>

    <!-- FOOTER -->

    <div style="
        background:#f9fafb;
        padding:25px;
        text-align:center;
        border-top:1px solid #e5e7eb;
    ">

        <p style="
            margin:0;
            color:#6b7280;
            font-size:14px;
            line-height:1.7;
        ">
            © 2026 Class Routine System <br/>
            Developed by C.R Time Pro Team
        </p>

    </div>

</div>

</div>

`



        });

        console.log(info.response);

    } catch (error) {

        console.log(error);

    }

};

module.exports = { sendMail };