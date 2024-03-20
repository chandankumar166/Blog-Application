const express = require('express');
const {verifyUser} = require('../utils/verifyUser');
const {createPost} = require('../controllers.js/post');

const postRouter = express.Router();

postRouter.post('/create', verifyUser, createPost)

module.exports = {postRouter}