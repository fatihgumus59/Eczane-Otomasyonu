const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const medicine = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  price: {
    type: Schema.Types.Decimal128,
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
}, { versionKey: false, timestamps: true });

const Medicine = mongoose.model('Medicine', medicine);
module.exports = Medicine;
