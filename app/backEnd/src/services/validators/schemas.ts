import * as Joi from 'joi';

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});

const newUserSchema = Joi.object({
    username: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});

const newTaskSchema = Joi.object({
    task: Joi.string().required(),
    userId: Joi.number().required(),
    completed: Joi.boolean().not(true).required(),
});

export {
    loginSchema,
    newUserSchema,
    newTaskSchema,
};
