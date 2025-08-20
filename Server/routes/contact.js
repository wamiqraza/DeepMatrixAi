const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    return res.status(500).json({ message: "SMTP environment variables are not configured" });
  }

  // Create transporter with your cPanel email settings
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: true,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false, 
    },
  });

  const mailOptions = {
    from: SMTP_USER, // your pro email
    to: SMTP_USER,   // where you want to receive messages
    replyTo: email,  // the visitor’s email
    subject: `Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    console.error("Mail Error:", err);
    res.status(500).json({ message: "Failed to send email", error: err.message });
  }
});

module.exports = router;
