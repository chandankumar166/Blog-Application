const express = require('express');
const {verifyUser} = require('../utils/verifyUser');
const {updateUser, deleteUser, signout, getUsers, getUser} = require('../controllers.js/user');

const userRouter = express.Router();

userRouter.put('/update/:userId', verifyUser, updateUser);
userRouter.delete('/delete/:userId', verifyUser, deleteUser);
userRouter.post('/signout', signout);
userRouter.get('/users', verifyUser, getUsers);
userRouter.get('/:userId', getUser);

module.exports = {userRouter};