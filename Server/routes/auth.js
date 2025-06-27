// In routes/auth.js

const express = require('express');
const router = express.Router();

let ADMIN_CREDENTIALS = {
  username: "wamiq",
  password: "123456"
};

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (
    username === ADMIN_CREDENTIALS.username &&
    password === ADMIN_CREDENTIALS.password
  ) {
    res.status(200).json({ success: true });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

router.post('/reset', (req, res) => {
  const { oldPassword, newPassword } = req.body;
  
  if (oldPassword !== ADMIN_CREDENTIALS.password) {
    return res.status(400).json({ success: false, message: "Old password is incorrect." });
  }

  ADMIN_CREDENTIALS.password = newPassword;
  return res.json({ success: true, message: "Password updated successfully!" });
});

module.exports = router;
