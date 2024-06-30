const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const handleErrors = require('../middleware/handleErrors');

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Signup Controller
const signup = async (req, res) => {
    const { firstname, lastname, username, email, password } = req.body;

    if (!firstname || !lastname || !username || !email || !password) {
        return res.status(400).json({ success: false, message: "Please provide all necessary information" });
    }

    const userExist = await User.findOne({ email });

    if (userExist) {
        return res.status(400).json({ success: false, message: "Email has been used" });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        const user = await User.create({ firstname, lastname, username, email, password: hashedPassword });
        res.status(201).json({ success: true, data: user });
    } catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({ success: false, errors });
    }
};

// Login Controller
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Please provide necessary information" });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('User not registered yet');
        }

        const authenticated = await bcrypt.compare(password, user.password);

        if (!authenticated) {
            throw new Error('Invalid email or password');
        }

        const token = generateToken(user._id);
        res.cookie('jwt', token, { maxAge: 60 * 60 * 1000 });
        return res.status(200).json({ success: true, data: user });
    } catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({ success: false, errors });
    }
};

module.exports = { signup, login };
