const Debt = require('../models/debt');

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

exports.getAllMedicine = async (req, res) => {
  try {


  } catch (err) {
    res.status(404).json({
      status: 'failed',
      err,
    });
  }
};