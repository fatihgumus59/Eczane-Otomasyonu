const Debt = require('../models/debt');

exports.createDebt = async (req, res) => {
  try {

    const debt = await Debt.create({
      ...req.body,
      medicine: [
        {
          "ilac": JSON.parse(req.body.ilac),
        }

      ]

    });

    console.log(req.body);
    res.status(201).redirect('/kisiler');


  } catch (err) {
    res.status(404).json({
      status: 'error',
      yazidr: console.log(req.body),
      err,
    });
  }
};

exports.getAllDebt = async (req, res) => {
  try {
    const debt = await Debt.find({}).populate('medicine.ilac').sort('-createdAt');

    res.status(200).render('list-debt', {
      page_name: "Kişiler",
      debt,
    });

  } catch (err) {
    res.status(404).json({
      status: 'failed',
      err,
    });
  }
};

exports.editDebt = async (req, res) => {
  try {
    const debt = await Debt.findOne({ _id: req.params.id }).populate('medicine.ilac');
    debt.name = req.body.name;
    debt.tc = req.body.tc;
    debt.total = req.body.total;
    debt.medicine = req.body.medicine;
    debt.status = req.body.status;
    debt.note = req.body.note;

    debt.save();

    res.status(200).redirect('/kisiler');

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

    res.status(200).redirect('/kisiler')

  } catch (err) {
    res.status(404).json({
      status: 'failed',
      err,
    });
  }
};

exports.getDebtPaid = async (req, res) => { // ödenmiş
  try {
    const status = 'Ödendi'
    const debt = await Debt.find({ status: status });

    res.status(200).render('list-debt-filter', {
      page_name: "Borcu Kapatanlar",
      debt,
      status,
    })

  } catch (err) {
    res.status(404).json({
      status: 'failed',
      err,
    });
  }
};

exports.getDebtUnpaid = async (req, res) => { // ödenmiş
  try {

    const status = 'Ödenmedi'
    const debt = await Debt.find({ status: status });

    res.status(200).render('list-debt-filter', {
      page_name: "Borçlular",
      debt,
      status,
    })

  } catch (err) {
    res.status(404).json({
      status: 'failed',
      err,
    });
  }
};

exports.debtOk = async (req, res) => {
  try {
    const debt = await Debt.findOne({ _id: req.params.id });
    debt.status = req.body.status;
    debt.save();
    console.log(req.body)

    res.status(200).redirect('/kisiler');

  } catch (err) {
    res.status(404).json({
      status: 'failed',
      err,
    });
  }
};
