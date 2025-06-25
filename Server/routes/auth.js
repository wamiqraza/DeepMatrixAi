const express = require('express');
const router = express.Router();

const ADMIN_CREDENTIALS = {
  username: "admin",
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

module.exports = router;
// This code defines a simple authentication route for an admin user.