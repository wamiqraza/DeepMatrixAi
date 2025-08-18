// In routes/contact.js
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;
  const { EMAIL, GMAIL_APP_PASS } = process.env;
  const gmailAppPass = GMAIL_APP_PASS ? GMAIL_APP_PASS.replace(/\s+/g, '') : undefined;

  if (!EMAIL || !gmailAppPass) {
    return res.status(500).json({ message: 'Email environment variables are not configured' });
  }

  // Set up nodemailer transporter (example with Gmail)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL,
      pass: gmailAppPass, // Use an app password, not your main password
    },
  });

  const mailOptions = {
    from: EMAIL,
    to: EMAIL,
    replyTo: email,
    subject: `Contact Form Submission from ${name}`,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to send email', error: err });
  }
});

module.exports = router;