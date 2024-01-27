const nodemailer = require("nodemailer");
require("dotenv").config();

sendVerificationEmail = async (email, verificationToken) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "bhumiksoni009@gmail.com",
      pass: process.env.GOOGLE_PASS,
    },
  });

  const mailOptions = {
    from: "amazonclone.com",
    to: email,
    subject: "email verification",
    text: `Click on this link to verify your email : http://localhost:8000/verify/${verificationToken}`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log("Error sending mail", err);
  }
};

module.exports = sendVerificationEmail;
