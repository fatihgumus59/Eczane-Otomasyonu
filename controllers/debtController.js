const Debt = require('../models/debt');
const Admin = require('../models/administration');

exports.createDebt = async (req, res) => {
  try {
    
    const debt = await Debt.create({
      ...req.body.body,
      medicine: req.body.ilac,
      total: req.body.total,
      password:req.body.body.tc,
      admin:req.session.userID,
    });
    
    console.log(req.body.body);
    req.flash('success',`Borçlu kişi başarılı bir şekilde oluşturuldu.`);
    res.status(201).redirect('/kisiler');

  } catch (err) {
    req.flash('error',`Borçlu kişi eklenemedi.`);
    res.status(400).redirect('/kisiler');
  }
};

exports.getAllDebt = async (req, res) => {
  try {
    const debt = await Debt.find({admin:req.session.userID}).populate('medicine.ilac').sort('-createdAt');
    const admin = await Admin.findById(req.session.userID); 
    const debtAdmin = await Debt.find({}).populate('medicine.ilac').sort('-createdAt');

    res.status(200).render('list-debt', {
      page_name: "Kişiler",
      debt,
      admin,
      debtAdmin,
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

    req.flash('info',`Borçlu kişi başarılı bir şekilde güncellendi.`);
    res.status(200).redirect('/kisiler');

  } catch (err) {
    req.flash('error',`Borçlu kişi güncellenemedi.`);
    res.status(400).redirect('/kisiler');
  }
};

exports.deleteDebt = async (req, res) => {
  try {
    const debt = await Debt.findOneAndDelete({ _id: req.params.id });

    req.flash('delete',`Borçlu kişi başarılı bir şekilde silindi.`);
    res.status(200).redirect('/kisiler')

  } catch (err) {
    req.flash('error',`Borçlu kişi silinemedi.`);
    res.status(200).redirect('/kisiler');
  }
};

exports.getDebtPaid = async (req, res) => { // ödenmiş
  try {
    const status = 'Ödendi'
    const debt = await Debt.find({ status: status,admin:req.session.userID }); // statüsü hem ödenmiş hemde giriş yapan adminin eklediklerini listele dedik.
    const admin = await Admin.findById(req.session.userID); 
    const debtAdmin = await Debt.find({status: status});

    res.status(200).render('list-debt-filter', {
      page_name: "Borcu Kapatanlar",
      debt,
      status,
      admin,
      debtAdmin,
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
    const debt = await Debt.find({ status: status,admin:req.session.userID }); // statüsü hem ödenmeyen hemde giriş yapan adminin eklediklerini listele dedik.
    const admin = await Admin.findById(req.session.userID);
    const debtAdmin = await Debt.find({status: status});

    res.status(200).render('list-debt-filter', {
      page_name: "Borçlular",
      debt,
      status,
      admin,
      debtAdmin,
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

    res.status(200).redirect('/kisiler');

  } catch (err) {
    res.status(404).json({
      status: 'failed',
      err,
    });
  }
};
