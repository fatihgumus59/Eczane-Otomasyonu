const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
  password: {
    type: String,
  },
  medicine: [{

    ilac: {
      type: Schema.Types.ObjectId,
      ref: 'Medicine',
      required: true,
    },
    quantity: {
      type: Number,
    },

  }],
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
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
  },

}, { versionKey: false, timestamps: true });

debt.pre('save', function (next) {
  // şifreyi hash ediyoruz.
  const user = this;
  if (!user.isModified('password')) return next();
  bcrypt.hash(user.password, 10, (err, hash) => {
    // 10 yazan yer  şifrenin zorluğunu arttırıyor.
    user.password = hash;
    next();
  });

})

const Debt = mongoose.model('Debt', debt);
module.exports = Debt;
