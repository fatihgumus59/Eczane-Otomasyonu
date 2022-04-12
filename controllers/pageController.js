const Medicine = require('../models/medicine');
const Debt = require('../models/debt');

exports.getIndexPage = async (req, res) => {

  const toplam = await Debt.find({}).count();
  const odenmemis = await Debt.where({ status: 'Ödenmedi' }).count().select('status');
  const odenmis = await Debt.where({ status: 'Ödendi' }).count().select('status');
  const notlar = await Debt.find({}).limit(4).sort('-createdAt');
  const list = await Debt.find({}).limit(7).populate('medicine.ilac').sort('-createdAt');

  const odenmisOran = (odenmis * 100) / toplam;
  const odenmemisOran = (odenmemis * 100) / toplam;

  
  res.status(200).render('index', {
    page_name: "Eczane Otomasyonu",
    toplam,
    odenmemis,
    odenmis,
    odenmisOran,
    odenmemisOran,
    notlar,
    debt: await Debt.aggregate(
      [
        {
          $group: {
            _id: "$status",
            total: {
              $sum: "$total"
            }
          }
        }
      ],
      function (err, result) {
        if (err) {
          res.send(err);
        } 

        return result;
      }
      
    ),
    list,
  });
};

exports.getDebtAddPage = async (req, res) => {

  const medicine = await Medicine.find(req.body);

  res.status(200).render('add-debt', {
    page_name: "Eczane Otomasyonu",
    medicine,
  });
};

exports.getEditDebtPage = async (req, res) => {

  const debt = await Debt.findOne({ _id: req.params.id }).populate('medicine.ilac');
  const medicine = await Medicine.find({});

  res.status(200).render('edit-debt', {
    page_name: `${debt.name} - Düzenle`,
    debt,
    medicine,
  });
};

exports.getMedicineAddPage = async (req, res) => {
  res.status(200).render('add-medicine',{
    page_name: "Eczane Otomasyonu",
  });
};

exports.getEditMedicinePage = async (req, res) => {
  const medicine = await Medicine.findOne({ _id: req.params.id });

  res.status(200).render('edit-medicine', {
    page_name: "Eczane Otomasyonu",
    medicine
  });
};

exports.getStatusPage = async (req, res) => {
  res.status(200).render('index',{
    page_name: "Eczane Otomasyonu",
  });
};

exports.getNotesPage = async (req, res) => {

  const debt = await Debt.find({});

  res.status(200).render('note', {
    page_name: "Notlar",
    debt,
  });
};

exports.getProforma = async (req, res) => {

  const debt = await Debt.findOne({ _id: req.params.id }).populate('medicine');

  res.status(200).render('proforma', {
    page_name: `${debt.name} `,
    debt,
  });
};

