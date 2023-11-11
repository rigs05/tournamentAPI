const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const { v1 } = require('uuid');

// User Registration
const registerUser = async (req, res) => {
    try {
        const { name, email, pass } = req.body;
        if (!email.includes('@')) {
            return res.status(400).json({ error: "Given email is not a valid email." });
        }
        const userExist = await userModel.findOne({ emailId: email });
        if (userExist) {
            return res.status(400).json({ message: "User already exists, please login." });
        }
        const hash = await bcrypt.hash(pass, 10);
        const newUser = new userModel({ name: name, emailId: email, pass: hash });
        newUser.save();
        res.status(201).json({ message: `User \'${name}\' registered successfully.` });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error." });
    }
};

// User Login
const userLogin = async (req, res) => {
    try {
        const { email, pass } = req.body;
        if (!email.includes('@')) {
            return res.status(400).json({ error: "Given email is not a valid email." });
        }
        const userExist = await userModel.findOne({ emailId: email });
        if (!userExist) {
            return res.status(400).json({ message: "User doesn't exist, please register." });
        }
        const passCheck = await bcrypt.compare(pass, userExist.pass );
        if (!passCheck) {
            return res.status(401).json({ error: "Incorrect password, please try again." });
        } else {
            const token = v1();
            res.status(200).json({ message: `Welcome ${userExist.name}`, token: token });
            
        }
        
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error." });
    }
};

// Password Reset
const resetPassword = async (req, res) => {
    try {
        const { email: email, pass: newPass } = req.body;
        if (!email.includes('@')) {
            return res.status(400).json({ error: "Given email is not a valid email." });
        }
        const userExist = await userModel.findOne({ emailId: email });
        if (!userExist) {
            return res.status(400).json({ message: "User doesn't exist, please register." });
        }
        const passCheck = await bcrypt.compare(newPass, userExist.pass );
        if (passCheck) {
            return res.status(401).json({ error: "New password cannot be same as old one." });
        }
        else {
            const hashPass = await bcrypt.hash(newPass, 10);
            userExist.pass = hashPass;
            await userExist.save();
            res.status(200).json({ message: "Password has been reset successfully." });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error." });
    }
};

module.exports = {
    registerUser,
    userLogin,
    resetPassword
}