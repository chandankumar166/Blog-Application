const {signupSchema, signinSchema} = require('../types');
const {User} = require('../models/user');
const bcryptjs = require('bcryptjs');
const {errorHandler} = require('../utils/error');
const json = require('jsonwebtoken');

const signup = async (req, res, next) => {
    try {
        const {username, email, password} = req.body;
        const {success} = signupSchema.safeParse(req.body);
        if (!success) {
            next(errorHandler(400, 'Incorrect Inputs'));
            return;
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

const signin = async (req, res, next) => {
    const {email, password} = req.body;
    const {success} = signinSchema.safeParse(req.body);
    if (!success) {
        next(errorHandler(400, 'Incorrect Inputs'));
        return;
    }
    try {
        const validUser = await User.findOne({email});
        if (!validUser) {
            return next(errorHandler(404, 'User not found'));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(400, 'Invalid Password'));
        }
        const token = json.sign({
            userId: validUser._id,
        }, process.env.JWT_SECRET);
        const {password: pass, ...rest} = validUser._doc;
        
        return res.status(200).cookie('access_token', token, {
            httpOnly: true
        }).json(rest);
    }
    catch (error) {
        next(error);
    }
};

module.exports = {signup, signin};