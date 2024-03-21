const {User} = require("../models/user");
const {errorHandler} = require("../utils/error");
const bcryptjs = require('bcryptjs');

const updateUser = async (req, res, next) => {
    if (req.user.userId !== req.params.userId) {
        return next(errorHandler(403, 'You are not the admin'));
    }
    if (req.body?.password < 6) {
        return next(errorHandler(400, 'Password must be atleast 6 characters.'));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
    try {
        const updatedUser = await User.findByIdAndUpdate({
            _id: req.user.userId
        }, {
            $set: {
                username: req.username,
                email: req.body.email,
                password: req.body.password
            }
        }, {new: true});
        const {password, ...rest} = updatedUser._doc;
        return res.status(200).json(rest);
    }
    catch (error) {
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    if (!req.user.isAdmin || req.user.userId !== req.params.userId) {
        return next(errorHandler(403, 'Unauthorized'));
    }
    try {
        await User.findByIdAndDelete(req.params.userId);
        return res.status(200).json({message: 'User has been deleted'});
    }
    catch (error) {
        next(error);
    }
};

const signout = async (req, res, next) => {
    try {
        res.clearCookie('access_token').status(200).json('User has been signed out');
    }
    catch (error) {
        next(error);
    }
};

const getUsers = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to view all the users'))
    }
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.sort === 'asc' ? 1 : -1;
        const users = await User.find({}).sort({createdAt: sortDirection}).skip(startIndex).limit(limit);
        const totalUsers = await User.countDocuments();
        const now = new Date()
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1, 
            now.getDate()
        )
        const lastMonthUsers = await User.countDocuments(
            {createdAt: {$gte: oneMonthAgo}}
        )
        return res.status(200).json({
            users: users.map((obj) => {
                const {password, ...remainingDetails} = obj._doc
                return remainingDetails;
            }),
            totalUsers,
            lastMonthUsers
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {updateUser, deleteUser, signout, getUsers};