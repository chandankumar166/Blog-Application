const {signupSchema} = require('../types');
const {User} = require('../models/user');
const bcryptjs = require('bcryptjs');

const signup = async (req, res) => {
    const {username, email, password} = req.body;
    const {success} = signupSchema.safeParse(req.body);
    if (!success) {
        return res.status(411).json({message: "Incorrect Inputs"});
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
        username,
        email,
        password: hashedPassword
    });
    try {
        await newUser.save();
        return res.status(201).json({message: 'New user got created'});
    }
    catch (error) {
        return res.status(500).json({message: error.message});
    }


};

module.exports = {signup};