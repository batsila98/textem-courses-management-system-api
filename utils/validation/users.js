const Joi = require('joi');

const registerValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .min(6)
            .required(),
        full_name: Joi.string()
            .min(4)
            .max(50)
            .required(),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .required(),
        username: Joi.string()
            .alphanum()
            .min(6)
            .max(30)
            .required(),
        gender: Joi.string()
            .alphanum(),
    });

    return schema.validate(data);
};

const loginValidation = (data) => {
    const schema = Joi.object({
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        username: Joi.string()
            .alphanum()
            .min(6)
            .max(30)
            .required(),
    });

    return schema.validate(data);
};

module.exports = {
    loginValidation,
    registerValidation,
};