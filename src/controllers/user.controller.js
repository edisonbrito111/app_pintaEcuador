const userMethods = {};
require('dotenv').config();
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function getUser(param) {
    try {
        return await User.findOne(param);
    } catch (error) {
        return false;
    }
}

userMethods.login = async (req, res) => {
    const {email , password} = req.body;
    const user = getUser({email});
    if (user) {
        const verifyPassword = await user.verifyPassword(password);
        if(!verifyPassword) {
            return res.status(400).json({
                status: false,
                message: "Email or password incorrect."
            });
        }
    
    try {
        const token = jwt.sign(user._id.toString(), .process.env.PRIVATE_KEY);
        
        return res.status(200).json({
            status: true,
            token,
            message: "Login correct."
        });
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: "There was a problem, please try again.",
        });
    }
} else {
        return res.status(400).json({
            status: false,
            message: "Email or password incorrect."
        });
    }
};

userMethods.register = (req, res) => {
    const {username, email, password, name} = req.body;
    if(username && email && password)
};

userMethods.authenticate = (req, res) => {};

module.exports = userMethods;