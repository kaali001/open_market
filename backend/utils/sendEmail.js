
const nodemailer = require("nodemailer");

async function sendEmail(to, subject, htmlContent) {
    try {
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL, // Your email address
                pass: process.env.PASSWORD, // Your email password
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: to, 
            subject: subject,
            html: htmlContent, 
        });

        console.log("Email sent successfully");
    } catch (error) {
        console.log("Email not sent:", error);
    }
};

module.exports = sendEmail;
