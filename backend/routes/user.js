const express = require('express');
const {verifyUser} = require('../utils/verifyUser');
const {updateUser, deleteUser} = require('../controllers.js/user');

const userRouter = express.Router();

userRouter.put('/update/:userId',verifyUser, updateUser)
userRouter.delete('/delete/:userId', verifyUser, deleteUser)

module.exports = {userRouter};