const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Register User
router.post('/register', async (req,res) => {
    const { username, email, password } = req.body;
    try {
        const user = new User({ username,  email, password});
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: 'User registration failed'});
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email, password: password });
    if (user) {
        res.json({ message: 'Login Successful'});
    } else {
        res.status(401).json({ error: 'Invalid Credentials' });
    }
});

module.exports = router;

