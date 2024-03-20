const {Post} = require("../models/post");
const {postSchema} = require("../types");
const {errorHandler} = require("../utils/error");

const createPost = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not the admin'))
    }
    
    const {success} = postSchema.safeParse(req.body);
    if (!success) {
        return next(errorHandler(400, 'All fields are required'))
    }
    const newPost = new Post({
        ...req.body,
        userId: req.user.userId
    })
    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost)
    }
    catch(error) {
        return next(error)
    }
}
module.exports = {createPost}