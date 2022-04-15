const Medicine = require('../models/medicine');
const fs = require('fs');


exports.createMedicine = async (req, res) => {
  try {

    const uploadDir = 'public/uploads';

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    await Medicine.create({
      ...req.body,
      image: '/uploads/' + req.file.filename,

    });
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
    const medicine = await Medicine.find({}).sort('-createdAt');

    res.status(201).render('list-medicine', {
      page_name: "İlaçlar",
      medicine
    });

  } catch (err) {
    res.status(404).json({
      status: 'failed',
      err,
    });
  }
};

exports.editMedicine = async (req, res) => {

  try {

    const medicine = await Medicine.findOne({ _id: req.params.id });
    medicine.name = req.body.name;
    medicine.price = req.body.price;
    medicine.medicineType = req.body.medicineType;
    medicine.description = req.body.description;

    if (!req.file) {

    } else if (!req.body.image) {
      medicine.image = '/uploads/' + req.file.filename;
    }

    medicine.save();

    res.status(200).redirect('/ilaclar');

  } catch (err) {
    res.status(404).json({
      status: 'failed',
      err,
    });
  }
}

exports.deleteMedicine = async (req, res) => {

  try {

    const medicine = await Medicine.findOneAndDelete({ _id: req.params.id })
    const path = 'public' + medicine.image;

    fs.unlink(path, (err) => {
      if (err) {
        console.error(err)
        return
      }
      //file removed
    })

    res.status(200).redirect('/ilaclar');

  } catch (err) {
    res.status(404).json({
      status: 'failed',
      err,
    });
  }
}