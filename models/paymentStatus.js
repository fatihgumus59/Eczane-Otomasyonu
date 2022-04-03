const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentStatus = new Schema({

    name: {
        type: String,
        required: true,
        unique: true,
    },
    debt: [{
        type: Schema.Types.ObjectId,
        ref: 'Debt',
        required: true,
    }],
});

const Status = mongoose.model('Status', paymentStatus);
module.exports = Status;
