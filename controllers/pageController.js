const Medicine = require('../models/medicine');
const Debt = require('../models/debt');

exports.getIndexPage = async (req, res) => {
  res.status(200).render('index');
};

exports.getDebtAddPage = async (req, res) => {

  const medicine = await Medicine.find(req.body);
  
  res.status(200).render('add-debt', {
    medicine,
  });
};

exports.getEditDebtPage = async (req, res) => {

  const debt = await Debt.findOne({ _id: req.params.id }).populate('medicine');
  const medicine = await Medicine.find({});

  res.status(200).render('edit-debt', {
    debt,
    medicine,
  });
};

exports.getMedicineAddPage = async (req, res) => {
  res.status(200).render('add-medicine');
};

exports.getEditMedicinePage = async (req, res) => {
  const medicine = await Medicine.findOne({ _id: req.params.id });

  res.status(200).render('edit-medicine', {
    medicine
  });
};

exports.getStatusPage = async (req, res) => {
  res.status(200).render('index');
};

