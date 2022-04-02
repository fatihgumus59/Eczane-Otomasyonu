const Medicine = require('../models/medicine');
const fs = require('fs');

exports.createMedicine = async (req, res) => {
  try {
    
    const uploadDir = 'public/uploads';

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    let uploadeImage = req.files.image;
    let uploadPath = __dirname + '/../public/uploads/' + uploadeImage.name;

    uploadeImage.mv(uploadPath, async () => {
      await Medicine.create({
        ...req.body,
        image: '/uploads/' + uploadeImage.name,
      });
      res.status(201).redirect('/ilaclar');
    });

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
      medicine
    });

  } catch (err) {
    res.status(404).json({
      status: 'failed',
      err,
    });
  }
};
