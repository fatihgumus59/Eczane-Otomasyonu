const Medicine = require('../models/medicine');
const Admin = require('../models/administration');
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
      admin:req.session.userID,

    });
    req.flash('success',`İlaç başarılı bir şekilde eklendi.`);
    res.status(201).redirect('/ilaclar');


  } catch (err) {
    req.flash('error',`İlaç eklenemedi.`);
    res.status(400).redirect('/ilaclar');
  }
};

exports.getAllMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.find({}).sort('-createdAt').populate('admin');
    const admin = await Admin.findById(req.session.userID);
    const medicineEditor = await Medicine.find({admin:req.session.userID}).sort('-createdAt');
    const query = req.query.medicine;

    res.status(201).render('list-medicine', {
      page_name: "İlaçlar",
      medicine,
      admin,
      query,
      medicineEditor
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

    req.flash('info',`İlaç başarılı bir şekilde güncellendi.`);
    res.status(200).redirect('/ilaclar');

  } catch (err) {
    req.flash('error',`İlaç güncellemesi başarısız.`);
    res.status(400).redirect('/ilaclar');
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

    req.flash('delete',`İlaç başarılı bir şekilde silindi.`);
    res.status(200).redirect('/ilaclar');

  } catch (err) {
    req.flash('error',`İlaç silme işlemi başarısız.`);
    res.status(400).redirect('/ilaclar');
  }
}