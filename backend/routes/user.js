const express = require('express');
const {verifyUser} = require('../utils/verifyUser');
const {update} = require('../controllers.js/user');

const userRouter = express.Router();

userRouter.put('/update/:userId',verifyUser, update)

module.exports = {userRouter};