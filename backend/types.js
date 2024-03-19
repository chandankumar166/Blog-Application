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

module.exports = {signupSchema, signinSchema}