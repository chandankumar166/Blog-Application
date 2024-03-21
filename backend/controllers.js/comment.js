const {Comment} = require("../models/comment");
const {commentSchema} = require("../types");
const {errorHandler} = require("../utils/error");

const createComment = async (req, res, next) => {
    try {
        const {content, postId, userId} = req.body;
        const {success} = commentSchema.safeParse(req.body);
        if (!success) {
            return next(errorHandler(400, 'Incorrect inputs'));
        }
        if (userId !== req.user.userId) {
            return next(errorHandler(403, 'You are not allowed to create the comment'));
        }
        const newComment = await Comment.create({
            content,
            postId,
            userId
        });
        return res.status(201).json(newComment);
    } catch (error) {
        next(error);
    }
};

const getComments = async (req, res, next) => {
    const postId = req.params.postId;
    try {
        const comments = await Comment.find({postId: postId}).sort({createdAt: -1});
        return res.status(200).json(comments);
    } catch (error) {
        next(error);
    }
};

const likeComment = async (req, res, next) => {
    try {
        const commentId = req.params.commentId;
        const comment = await Comment.findOne({_id: commentId});

        if (!comment) {
            return next(errorHandler(404, 'Comment not found'));
        }
        const userId = req.user.userId;
        const userIndex = comment.likes.findIndex((id) => userId === id);
        if (userIndex === -1) {
            comment.likes.push(userId);
            comment.numberOfLikes += 1;
        }
        else {
            comment.likes.splice(userId, 1);
            comment.numberOfLikes -= 1;
        }
        await comment.save();
        return res.status(200).json(comment);
    } catch (error) {
        next(error);
    }

};

const editComment = async (req, res, next) => {
    try {
        const commentId = req.params.commentId;
        const userId = req.user.userId;
        const comment = await Comment.findById({_id: commentId});
        if (!comment) {
            return next(errorHandler(404, 'Comment not found'));
        }
        if (comment.userId !== userId && !req.user.isAdmin) {
            return next(errorHandler(403, 'You are not allowed to edit the comment'));
        }
        const editedComment = await Comment.findByIdAndUpdate({_id: commentId},
            {
                $set: {
                    content: req.body.content
                }
            }, {new: true}
        );
        return res.status(200).json(editedComment)
    } catch (error) {
        next(error);
    }

};

const deleteComment = async (req, res, next) => {
    try {
        const commentId = req.params.commentId;
        await Comment.findByIdAndDelete({_id: commentId})
        return res.status(200).json(deleteComment)
    } catch (error) {
        next(error)
    }
}

module.exports = {createComment, getComments, likeComment, editComment, deleteComment};