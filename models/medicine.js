const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const medicine = new Schema({

    name: {
        type: String,
        unique: true,
        required: true
    },
    price:{
        type: Number,
        required: true,
    },
    medicineType: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,

    },
    createdAt: {
        type: Date,
        default: Date.now,
    }

});

const Medicine = mongoose.model('Medicine', medicine);
module.exports = Medicine;
