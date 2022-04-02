const Medicine = require('../models/medicine');

exports.getIndexPage = async (req, res) => {
  res.status(200).render('index');
};

exports.getDebtPage = async (req, res) => {
  res.status(200).render('list-debt');
};

exports.getDebtAddPage = async (req, res) => {
  res.status(200).render('add-debt');
};

exports.getMedicineAddPage = async (req, res) => {
  res.status(200).render('add-medicine');
};

exports.getEditMedicinePage = async (req, res) => {
  const medicine = await Medicine.findOne({_id: req.params.id});
  
  res.status(200).render('edit-medicine',{
    medicine
  });
};


