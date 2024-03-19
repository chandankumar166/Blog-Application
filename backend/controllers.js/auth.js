const {signupSchema} = require('../types');
const {User} = require('../models/user');
const bcryptjs = require('bcryptjs');
const {errorHandler} = require('../utils/error');

const signup = async (req, res, next) => {
    try {
        const {username, email, password} = req.body;
        const {success} = signupSchema.safeParse(req.body);
        if (!success) {
            next(errorHandler(400, 'Incorrect Inputs'));
        }
        const hashedPassword = bcryptjs.hashSync(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();
        return res.status(201).json({message: 'New user got created'});
    }
    catch (error) {
        next(error);
    }


};

module.exports = {signup};