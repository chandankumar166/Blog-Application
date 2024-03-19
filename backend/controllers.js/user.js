const {User} = require("../models/user");
const {errorHandler} = require("../utils/error");
const bcryptjs = require('bcryptjs')

const update = async (req, res, next) => {
    if (req.user.userId !== req.params.userId) {
        return next(errorHandler(403, 'You are not the admin'))
    }
    if (req.body?.password < 6) {
        return next(errorHandler(400, 'Password must be atleast 6 characters.'))
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
    try {
        const updatedUser = await User.findByIdAndUpdate({
            _id: req.user.userId
        },{
            $set: {
                username: req.username,
                email: req.body.email,
                password: req.body.password
            }
        }, {new: true})
        const {password, ...rest} = updatedUser._doc;
        return res.status(200).json(rest);
    }
    catch(error) {
        next(error)
    }
}

module.exports = {update}