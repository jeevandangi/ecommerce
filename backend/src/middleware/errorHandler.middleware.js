import joi from 'joi';

const createUserValidation = joi.object({
    name: joi.string().min(3).max(30).required(),
    phoneNumber: joi.string()
        .pattern(/^\d{10,}$/) // At least 10 digits (can be more)
        .required()
        .messages({
            'string.pattern.base': 'Phone number must have at least 10 digits.',
            'string.empty': 'Phone number is required.',
        }),
    password: joi.string().min(6).max(30).required()
})

const createUserLoginValidation = joi.object({
    phoneNumber: joi.string()
        .pattern(/^\d{10,}$/) // At least 10 digits (can be more)
        .required()
        .messages({
            'string.pattern.base': 'Phone number must have at least 10 digits.',
            'string.empty': 'Phone number is required.',
        }),
    password: joi.string().min(6).max(30).required()
})


const createAddressValidation = joi.object({
    country: joi.string().min(3).max(20),
    district: joi.string().min(3).max(20),
    city: joi.string().min(3).max(20),
    tole: joi.string().min(3).max(20),
    muncipility: joi.string().min(3).max(20),
    province: joi.string().min(3).max(20),
    number: joi.string().min(3).max(20),
    userId: joi.string().min(3).max(50),
})


export {
    createUserValidation,
    createUserLoginValidation,
    createAddressValidation
}