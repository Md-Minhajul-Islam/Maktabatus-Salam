const nodemailer = require("nodemailer");

async function sendEmail(to, sub, text) {
  try {
    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: process.env.ETHEREAL_USERNAME,
        pass: process.env.ETHEREAL_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: testAccount,
      to: to,
      subject: sub,
      text: text,
      html: `<b>Hello!</b> ${text}`,
    });
    return info.messageId;
    // console.log("Message sent: %s", info.messageId);
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (err) {
    next(err);
  }
}

module.exports = sendEmail;
