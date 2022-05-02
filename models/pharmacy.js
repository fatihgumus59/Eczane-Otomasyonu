const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pharmacySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  stamp: {
    type: String,
  },select:{
    type: Boolean,
  }
}, { versionKey: false, timestamps: true }); // versiyon tutma ama oluşturma tarihi ve update tarihlerini tut dedik.


const Pharmacy = mongoose.model('Pharmacy', pharmacySchema);
module.exports = Pharmacy;
