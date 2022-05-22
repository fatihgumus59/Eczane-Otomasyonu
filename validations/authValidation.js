const Joi = require('joi');
const Admin = require('../models/administration');

const createUserValidation = Joi.object({
    name: Joi.string().required().min(5).messages({
        'string.base': `İsim metin türünde olmalıdır.`,
        'string.empty': `İsim boş bir alan olamaz.`,
        'string.min': `İsim uzunluğu minimum {#limit} olmalıdır.`,
        'any.required': `İsim zorunlu bir alandır.`
    }),
    username: Joi.string().required().min(3).custom((value, helper) => {

        if (value.length > 30) {
            return helper.message("Girilen Kullanıcı 30 karakterden uzun");
        }else{
            return true;
        }

    }).messages({
        'string.empty': `Kullanıcı adı boş bir alan olamaz.`,
        'string.min': `Kullanıcı adı uzunluğu minimum {#limit} olmalıdır.`,
        'any.required': `Kullanıcı adı zorunlu bir alandır.`
    }),
    password: Joi.string().required().min(8).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).messages({
        'string.empty': `Şifre boş bir alan olamaz.`,
        'string.min': `Şifre uzunluğu minimum {#limit} olmalıdır.`,
        'any.required': `Şifre zorunlu bir alandır.`
    }),
    email: Joi.string().required().email().messages({
        'string.empty': `E-Mail boş bir alan olamaz.`,
        'string.min': `E-Mail uzunluğu minimum {#limit} olmalıdır.`,
        'any.required': `E-Mail zorunlu bir alandır.`
    }),


});

const loginUserValidation = Joi.object({
    username: Joi.string().required().min(3).messages({
        'string.empty': `Kullanıcı adı boş bir alan olamaz.`,
        'string.min': `Eksik kullanıcı adı.`,
        'any.required': `Kullanıcı adı zorunlu bir alandır.`
    }),
    password: Joi.string().required().min(8).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).messages({
        'string.empty': `Şifre boş bir alan olamaz.`,
        'string.min': `Eksik şifre.`,
        'any.required': `Şifre zorunlu bir alandır.`
    }),
});

module.exports = {
    createUserValidation,
    loginUserValidation,
}