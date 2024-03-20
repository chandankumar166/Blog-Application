const zod = require('zod');

const signupSchema = zod.object({
    username: zod.string(),
    email: zod.string().email(),
    password: zod.string()
})

const signinSchema = zod.object({
    email: zod.string().email(),
    password: zod.string()
})

const postSchema = zod.object({
    title: zod.string(),
    content: zod.string(),
    category: zod.string().optional()
})

module.exports = {signupSchema, signinSchema, postSchema}