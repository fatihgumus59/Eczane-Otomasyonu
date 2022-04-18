const Joi = require('joi');

const createUserValidation = Joi.object({
    name: Joi.string().required().min(5),
    username : Joi.string().required().min(3),
    password : Joi.string().required().min(8).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')), // özel karakterler içermeli
    email: Joi.string().required().email(),

});

module.exports = {
    createUserValidation,
}