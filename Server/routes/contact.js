// In routes/contact.js
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  // Set up nodemailer transporter (example with Gmail)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'salehshazli786@gmail.com',
      pass: 'sgqm wzwq dgif qnsz', // Use an app password, not your main password
    },
  });

  const mailOptions = {
    from: email,
    to: 'salehshazli786@gmail.com',
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