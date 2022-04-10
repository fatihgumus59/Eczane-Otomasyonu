const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const debt = new Schema({
  name: {
    type: String,
    required: true,
  },
  tc: {
    type: String,
    unique: true,
    required: true,
  },
  medicine: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Medicine',
      required: true,
    },  
  ],
  total:{
    type: Schema.Types.Decimal128,
    default:0,
  },
  status: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

});

const Debt = mongoose.model('Debt', debt);
module.exports = Debt;
