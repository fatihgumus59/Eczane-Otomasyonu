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
      ilac: {
        type: Schema.Types.ObjectId,
        ref: 'Medicine',
        required: true,
      },
      quantity: {
        type: Number,
      }
    },
  ],
  total: {
    type: Schema.Types.Decimal128,
    default: 0,
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

debt.pre('save', function (next) {

  const debt = this;
  
  debt.total = Number(debt.medicine.reduce( 
    (previousValue, currentValue) =>
      previousValue + currentValue.quantity *currentValue.ilac.price, 

    0,
  ))

  next();
});

const Debt = mongoose.model('Debt', debt);
module.exports = Debt;
