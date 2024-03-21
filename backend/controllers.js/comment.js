const {Comment} = require("../models/comment");
const {commentSchema} = require("../types");
const {errorHandler} = require("../utils/error");

const createComment = async (req, res, next) => {
    try {
        const {content, postId, userId}  = req.body;
        const {success} = commentSchema.safeParse(req.body);
        if (!success) {
            return next(errorHandler(400, 'Incorrect inputs'))
        }
        if (userId !== req.user.userId) {
            return next(errorHandler(403, 'You are not allowed to create the comment'))
        }
        const newComment = await Comment.create({
            content,
            postId,
            userId
        })
        return res.status(201).json(newComment);
    } catch (error) {
        next(error)
    }
}

const getComments = async (req, res, next) => {
    const postId = req.params.postId;
    try {
        const comments = await Comment.find({postId: postId}).sort({createdAt: -1})
        return res.status(200).json(comments);
    } catch (error) {
        next(error);
    }
}

module.exports = {createComment, getComments}