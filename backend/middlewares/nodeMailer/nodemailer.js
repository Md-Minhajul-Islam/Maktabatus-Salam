const nodemailer = require("nodemailer");

async function sendEmail(to, sub, text) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 2525,
      secure: false,
      auth: {
        user: process.env.ETHEREAL_USERNAME,
        pass: process.env.ETHEREAL_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: `"Maktabatus Salam" <${process.env.ETHEREAL_USERNAME}>`,
      to,
      sub,
      text,
      html: `<b>Hello!</b> ${text}`,
    });
    return info.messageId;
    // console.log("Message sent: %s", info.messageId);
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (err) {
    throw err;
  }
}

module.exports = sendEmail;
