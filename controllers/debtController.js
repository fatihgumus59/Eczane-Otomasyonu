const Debt = require('../models/debt');
const Medicine = require('../models/medicine');

exports.createDebt = async (req, res) => {
  try {

    const debt = await Debt.create(req.body);

    res.status(201).redirect('/borclular');


  } catch (err) {
    res.status(404).json({
      status: 'error',
      err,
    });
  }
};

exports.getAllDebt = async (req, res) => {
  try {
    const debt = await Debt.find().populate('Medicine');
    debt.medicine;

    res.status(200).render('list-debt', {
      debt,
    })

  } catch (err) {
    res.status(404).json({
      status: 'failed',
      err,
    });
  }
};

exports.editDebt = async (req, res) => {
  try {
    const debt = await Debt.findOne({ _id: req.params.id });
    debt.name = req.body.name;
    debt.tc = req.body.tc;
    debt.debt = req.body.debt;
    debt.medicine = req.body.medicine;
    debt.note = req.body.note;

    debt.save();

    res.status(200).redirect('/borclular');

  } catch (err) {
    res.status(404).json({
      status: 'failed',
      err,
    });
  }
};

exports.deleteDebt = async (req, res) => {
  try {
    const debt = await Debt.findOneAndDelete({ _id: req.params.id });

    res.status(200).redirect('/borclular')

  } catch (err) {
    res.status(404).json({
      status: 'failed',
      err,
    });
  }
};