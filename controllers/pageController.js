const Medicine = require('../models/medicine');
const Status = require('../models/paymentStatus');

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
  const medicine = await Medicine.findOne({ _id: req.params.id });

  res.status(200).render('edit-medicine', {
    medicine
  });
};

exports.getStatusPage = async (req, res) => {
  res.status(200).render('index');
};

exports.addStatus = async (req, res) => {

  try {
    const status = await Status.create(req.body);

    res.status(200).json({
      message: 'Success',
      status,
    });


  } catch (err) {
    res.status(404).json({
      status: 'error',
      err,
    });

  }


};
