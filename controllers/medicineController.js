const Medicine = require('../models/medicine');

exports.createMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.create(req.body);

    res.status(201).redirect('/ilaclar');

  } catch (err) {
    res.status(404).json({
      status: 'error',
      err,
    });
  }
};

exports.getAllMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.find()

    res.status(201).render('list-medicine',{
      medicine
    });
    
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      err,
    });
  }
};
