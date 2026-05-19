const nodemailer = require("nodemailer");

const sendMail = async (emails, subject, text) => {

    console.log("MAIL FUNCTION CALLED");

    try {

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({

            // 🔥 sender name
            from: `"Class Routine" <${process.env.EMAIL_USER}>`,

            // 🔥 all users
            bcc: emails,

            subject,

            // 🔥 beautiful html email
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

        console.log("EMAIL SENT SUCCESSFULLY");

    } catch (error) {

        console.log("MAIL ERROR:", error);

    }
};

module.exports = { sendMail };