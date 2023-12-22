import nodelmailer from "nodemailer";
import config from "config"
// import fs from "fs/promises";

const { HOST, AUTH, PORT } = config.get("EMAIL_SMTP");

async function sendMail(emailData) {
    try {
        let transporter = nodelmailer.createTransport({

            host: HOST,
            port: PORT,
            secure: true,
            auth: {
                user: AUTH["USER"],
                pass: AUTH["PASS"]
            }
        });

        let info = await transporter.sendMail({
            from: `"Test Solutions" <${AUTH["USER"]}>`,
            subject: emailData.subject, // Subject line
            to: emailData.to,
            html: emailData.body
        });
        console.log("EMAIL SENT");
        // await fs.appendFile("logs/emaillogs.txt", `${info.messageId}\n`);
    } catch (error) {
        console.log(error);
    }
}

// sendMail()
// sendMail({
//     subject: "User Account Verification - Test",
//     to: "xxxxxx@gmail.com",
//     body: "Testing "
// });
export default sendMail;
