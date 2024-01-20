import nodemailer from "nodemailer";
// import config from "config"
// import fs from "fs/promises";

// const { HOST, AUTH, PORT } = config.get("EMAIL_SMTP");

async function sendMail(emailData) {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port:587,
      auth: {
        user: 'cameron.schuster@ethereal.email',
        pass: 'jt6tnzUNJCN3GQy7JP'
      },
    });
    let info = await transporter.sendMail({
      from: `"Test Solutions" <shaik@gmail.com>`,
      subject: emailData.subject, // Subject line
      to: emailData.to,
      html: emailData.body,
    });
    console.log("EMAIL SENT");
    console.log("Message sent: %s", info.messageId);
    // await fs.appendFile("logs/emaillogs.txt", `${info.messageId}\n`);
  } catch (error) {
    console.log("err",error);
  }
}

// sendMail()
// sendMail({
//     subject: "User Account Verification - Test",
//     to: userData,
//     body: randonString()
// });
export default sendMail;
