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

            from: `"Class Routine Kalna Polytechnic" <${process.env.EMAIL_USER}>`,

            bcc: emails,

            subject,

            html: `

<div style="
    background:#0f172a;
    padding:40px;
    font-family:Arial,sans-serif;
">

    <div style="
        max-width:650px;
        margin:auto;
        background:#111827;
        border-radius:20px;
        overflow:hidden;
        border:1px solid rgba(255,255,255,0.1);
    ">

        <!-- HEADER -->

        <div style="
            background:linear-gradient(135deg,#2563eb,#7c3aed);
            padding:40px;
            text-align:center;
        ">

            <img
                src="https://www.dropbox.com/scl/fi/syqw5fh516kmri3nm7o9q/kalna2.png?rlkey=r5xu3xdpmuqu5btbql11ebcel&st=bai8z4xs&raw=1"
                width="90"
                style="
                    border-radius:20px;
                    margin-bottom:15px;
                    box-shadow:0 0 20px rgba(255,255,255,0.3);
                "
            />

            <h1 style="
                color:white;
                margin:0;
                font-size:32px;
                letter-spacing:2px;
            ">
                CLASS ROUTINE
            </h1>

            <p style="
                color:#dbeafe;
                margin-top:10px;
                font-size:16px;
            ">
                Smart Daily Class Updates
            </p>

        </div>

        <!-- BODY -->

        <div style="padding:40px; color:white;">

            <h2 style="
                font-size:28px;
                margin-bottom:20px;
                color:#60a5fa;
            ">
                ${subject}
            </h2>

            <p style="
                font-size:17px;
                line-height:1.8;
                color:#d1d5db;
            ">
                ${text}
            </p>

            <div style="
                margin-top:35px;
                text-align:center;
            ">

                <a
                    href="https://classroutinetime.vercel.app"
                    style="
                        display:inline-block;
                        padding:16px 30px;
                        background:linear-gradient(135deg,#2563eb,#7c3aed);
                        color:white;
                        text-decoration:none;
                        border-radius:12px;
                        font-size:18px;
                        font-weight:bold;
                        box-shadow:0 0 20px rgba(37,99,235,0.4);
                    "
                >
                    Open App
                </a>

            </div>

        </div>

        <!-- FOOTER -->

        <div style="
            padding:20px;
            text-align:center;
            border-top:1px solid rgba(255,255,255,0.1);
            color:#9ca3af;
            font-size:14px;
        ">

            © 2026 Class Routine • Developed by Soham Dutta

        </div>

    </div>

</div>

`,

        });

        console.log("MAIL SENT");

    } catch (error) {

        console.log("MAIL ERROR:", error);

    }

};

module.exports = { sendMail };