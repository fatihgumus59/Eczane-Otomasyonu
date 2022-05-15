const Api = require('../models/api');
const Medicine = require('../models/medicine');
const Debt = require('../models/debt');

exports.createApi = async (req, res) => {
  try {
    const api = await Api.create({
      ...req.body,
      admin: req.session.userID,

    });

    req.flash('success', `API başarılı bir şekilde oluşturuldu.`);
    res.status(201).redirect('/api');

  } catch (error) {
    req.flash('error', `API oluşturulamadı.`);
    res.status(400).redirect('/api');

  }
};

exports.editApi = async (req, res) => {
  try {

    const api = await Api.findByIdAndUpdate({ _id: req.body.selectId }, {
      name: req.body.name,
      email: req.body.email,
      status: req.body.status,
    });

    req.flash('info', `API başarılı bir şekilde güncellendi.`);
    res.status(200).redirect('/api');

  } catch (error) {
    req.flash('error', `API güncellemesi başarısız.`);
    res.status(400).redirect('/api');
  }
};

exports.getDebtDetailsPage = async (req, res) => { // apiyi detaylı göstermek için
  try {
    const debt = await Debt.find().select('-password -admin -medicine._id') // başına - konulunca onu tablodan çıkarıyor.

    res.status(200).json({
      request_status: 'success',
      api_status: 'active',
      method: 'GET',
      json: true,
      api: req.query.api_key,
      debts: debt,
    });
  } catch (error) {
    res.status(404).json({
      status: 'error',
      error: error.message,
    });
  }
};

exports.getDebtPage = async (req, res) => {
  try {
    const debt = await Debt.find().select('-password -admin -medicine._id') // başına - konulunca onu tablodan çıkarıyor.

    res.status(200).json(debt);
    
  } catch (error) {
    res.status(404).json({
      status: 'error',
      error: error.message,
    });
  }
};// mobil uygulama için dizi olarak gönderiliyor

exports.getMedicineDetailPage = async (req, res) => { // apiyi detaylı göstermek için
  try {
    const medicine = await Medicine.find().select('-admin -image -createdAt -updatedAt')

    res.status(200).json({
      request_status: 'success',
      api_status: 'active',
      method: 'GET',
      json: true,
      api: req.query.api_key,
      medicines: medicine
    });
  } catch (error) {
    res.status(404).json({
      status: 'error',
      error: error.message,
    });
  }
};

exports.getMedicinePage = async (req, res) => {
  try {
    const medicine = await Medicine.find().select('-admin -image -createdAt -updatedAt')

    res.status(200).json(medicine);
  } catch (error) {
    res.status(404).json({
      status: 'error',
      error: error.message,
    });
  }
};// mobil uygulama için dizi olarak gönderiliyor

exports.deleteApi = async (req, res) => {
  try {
    const api = await Api.findOneAndDelete({ _id: req.params.id });

    req.flash('delete', `API başarılı bir şekilde silindi.`);
    res.status(200).redirect('/api');

  } catch (error) {
    req.flash('delete', `API silme isteği başarısız.`);
    res.status(400).redirect('/api');
  }
};

exports.okApi = async (req, res) => {
  try {
    const apiId = req.body.apiId;

    const api = await Api.findByIdAndUpdate({ _id: apiId }, {
      status: true
    });

    res.status(200);
  } catch (error) {
    res.status(404).json({
      status: 'error',
      error: error.message,
    });
  }
};