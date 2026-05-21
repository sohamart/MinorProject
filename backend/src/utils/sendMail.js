const nodemailer = require("nodemailer");

require("dotenv").config({
    path: "./.env"
});
const transporter = nodemailer.createTransport({

    host: "smtp.gmail.com",

    port: 587,

    secure: false,

    family: 4,

    auth: {

        user: process.env.EMAIL_USER,

        pass: process.env.EMAIL_PASS,

    },

    tls: {
        rejectUnauthorized: false
    }

});

const sendMail = async (emails, subject, text) => {

    try {
        await transporter.verify();

        console.log("SMTP READY");

        const info = await transporter.sendMail({

            from: `"Class Routine Kalna Polytechnic" <${process.env.EMAIL_USER}>`,

            bcc: emails,

            subject,

            html: `

<div style="
    background:#f3f4f6;
    padding:30px;
    font-family:Arial,sans-serif;
">

<div style="
    max-width:650px;
    margin:auto;
    background:white;
    border-radius:18px;
    overflow:hidden;
    border:1px solid #e5e7eb;
    box-shadow:0 5px 20px rgba(0,0,0,0.08);
">

    <div style="
        background:#2563eb;
        padding:30px;
        text-align:center;
    ">

        <img
            src="https://www.dropbox.com/scl/fi/3lsiiius10heauxtpmlnc/clock.PNG?rlkey=qhdpltood8ic0bx994lcn9cp1&st=vcmbqxg1&raw=1"
            width="80"
            style="
                border-radius:16px;
                background:white;
                padding:8px;
                margin-bottom:10px;
            "
        />

        <h1 style="
            color:white;
            margin:0;
            font-size:30px;
            letter-spacing:1px;
        ">
            CLASS ROUTINE
        </h1>

        <p style="
            color:#dbeafe;
            margin-top:8px;
            font-size:15px;
        ">
            Daily Educational Updates
        </p>

    </div>

    <div style="padding:35px; color:#111827;">

        <h2 style="
            font-size:26px;
            margin-bottom:20px;
            color:#2563eb;
        ">
            ${subject}
        </h2>

        <p style="
            font-size:16px;
            color:#111827;
            margin-bottom:20px;
        ">
            Hello Student,
        </p>

        <p style="
            font-size:16px;
            line-height:1.8;
            color:#374151;
        ">
            ${text}
        </p>

        <div style="
            margin-top:30px;
            text-align:center;
        ">

            <a
                href="https://classroutinetime.vercel.app"
                style="
                    display:inline-block;
                    padding:14px 28px;
                    background:#2563eb;
                    color:white;
                    text-decoration:none;
                    border-radius:10px;
                    font-size:16px;
                    font-weight:bold;
                "
            >
                Open Class Routine
            </a>

        </div>

    </div>

    <div style="
        padding:18px;
        text-align:center;
        background:#f9fafb;
        border-top:1px solid #e5e7eb;
        color:#6b7280;
        font-size:13px;
    ">
        © 2026 Class Routine • Developed by C.R Time Pro Team
    </div>

</div>

</div>

            `,

        });

        console.log("MAIL SENT:", info.response);

        return info;

    } catch (error) {

        console.log("MAIL ERROR:", error.message);

        return null;

    }

};

module.exports = { sendMail };