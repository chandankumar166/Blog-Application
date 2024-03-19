const express = require('express');
const {signup} = require('../controllers.js/auth');

const authRouter = express.Router();

authRouter.post('/signup', signup);

module.exports = {authRouter};