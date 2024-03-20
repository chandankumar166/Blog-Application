const express = require('express');
const {verifyUser} = require('../utils/verifyUser');
const {updateUser, deleteUser, signout} = require('../controllers.js/user');

const userRouter = express.Router();

userRouter.put('/update/:userId',verifyUser, updateUser)
userRouter.delete('/delete/:userId', verifyUser, deleteUser)
userRouter.post('/signout', signout)

module.exports = {userRouter};