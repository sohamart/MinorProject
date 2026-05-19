const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
});

const sendMail = async (emails, subject, text) => {

    try {

        const accessToken = await oauth2Client.getAccessToken();

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: process.env.EMAIL_USER,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,

            // 🔥 all users
            bcc: emails,

            subject,
            text,
        });

        console.log("EMAIL SENT SUCCESSFULLY");

    } catch (error) {

        console.log("MAIL ERROR:", error);

    }
};

module.exports = { sendMail };