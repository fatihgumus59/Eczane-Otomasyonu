const mongoose = require('mongoose');
const randToken = require("rand-token")
const Schema = mongoose.Schema;

const ApiSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    apiToken: {
        type: String,
        unique: true,
    },
    status:{
        type: Boolean,
        default: false,
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
    },
}, { versionKey: false, timestamps: true }); // versiyon tutma ama oluşturma tarihi ve update tarihlerini tut dedik.

ApiSchema.pre('save', function (next) {

    let api = this;
    if (!api.apiToken) api.apiToken = randToken.generate(32); //32 karakterlik bir alfasayısal token oluşturur.
    next();
})

const Api = mongoose.model('Api', ApiSchema);
module.exports = Api;
