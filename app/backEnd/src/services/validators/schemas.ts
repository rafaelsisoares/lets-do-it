import * as Joi from 'joi';

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});

const newUserSchema = Joi.object({
    username: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
})

export {
    loginSchema,
    newUserSchema,
};
