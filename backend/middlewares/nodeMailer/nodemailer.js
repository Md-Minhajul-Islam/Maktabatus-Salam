const nodemailer = require("nodemailer");

async function sendEmail(to, subject, text) {
  try {
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: `"Maktabatus Salam" <makatabatussalam@mail.com>`, // can be any email
      to,
      subject,
      text,
      html: `<b>Hello!</b> ${text}`,
    });
    return info;
  } catch (err) {
    throw err;
  }
}

module.exports = sendEmail;
