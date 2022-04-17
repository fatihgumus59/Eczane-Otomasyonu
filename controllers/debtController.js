const Debt = require('../models/debt');
const axios = require('axios');

exports.createDebt = async (req, res) => {
  try {
    const debt = await Debt.create({
      ...req.body.body,
      medicine: req.body.ilac,
      total: req.body.total
    });

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

exports.getEditDebtPageApi = async (req, res) => {

  try {
    let data
    data = await Debt.findOneAndUpdate({ _id: req.params.id }, {
      status: req.body.status,
      tc: req.body.tc,
      name: req.body.name,
      note: req.body.note,
    }).populate('medicine.ilac');


    res.status(200).json(data);
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      err,
    });
  }
};

exports.editDebt = async (req, res) => {

  try {
    await Debt.findOneAndUpdate({ _id: req.params.id }, {
      status: req.body.status,
      tc: req.body.tc,
      name: req.body.name,
      note: req.body.note,
    }).populate('medicine.ilac');


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
