const Admin = require('../models/administration');
const Pharmacy = require('../models/pharmacy');
const Debt = require('../models/debt');
const Medicine = require('../models/medicine');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
  try {
    const admin = await Admin.create(req.body);

    res.status(201).redirect('/');
  } catch (error) {
    res.status(404).json({
      status: 'error',
      error: error.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {

    const { username, password } = req.body;
    const admin = Admin.findOne({ username }, (err, user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, same) => {
          if (same) {
            //veriler eşleşiyor ise
            req.session.userID = user._id;
            req.session.userName = user.name;
            res.status(200).redirect('/');
          }
        });
      }
    });


  } catch (error) {
    res.status(404).json({
      status: 'error',
      error: error.message,
    });
  }
};

exports.logoutUser = async (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
}

exports.editAdmin = async (req, res) => {
  try {

    const user = await Admin.findByIdAndUpdate({ _id: req.params.id }, {
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      role: req.body.role,
      confirmation: req.body.confirmation
    });


    res.status(200).redirect('/auth/manager');
  } catch (error) {
    res.status(404).json({
      status: 'error',
      error: error.message,
    });
  }
};

exports.addAdmin = async (req, res) => {
  try {

    const user = await Admin.create(req.body);

    res.status(200).redirect('/auth/manager');
  } catch (error) {
    res.status(404).json({
      status: 'error',
      error: error.message,
    });
  }
};

exports.deleteAdmin = async (req, res) => {
  try {

    // debt ve medicine içinde bulunan verileri güncelliyoruz bu alanda.
    // yönetici bir editör veya admin siler ise sildiği admin veya editörün eklediği borçlu kişiler ve eklediği ilaçlar
    // silen adminin hesabına yansıtılmasını sağladık.

    const debt = await Debt.find({admin:req.params.id });
    if(debt.length==1){
      debt.admin = req.session.userID;
      debt.save();  
    }else{
      for(let i=0; i<debt.length;i++){

        debt[i].admin = req.session.userID;
        debt[i].save();
      }
    }

    const medicine = await Medicine.find({admin:req.params.id });

    if(medicine.length==1){
      medicine.admin = req.session.userID;
      medicine.save();  
    }else{
      for(let i=0; i<medicine.length;i++){

        medicine[i].admin = req.session.userID;
        medicine[i].save();
      }
    }
    

    const admin = await Admin.findByIdAndRemove({ _id: req.params.id });

    res.status(200).redirect('/auth/manager');

  } catch (error) {
    res.status(404).json({
      status: 'error',
      error: error.message,
    });
  }
};

exports.adminOk = async (req, res) => {
  try {
    const admin = await Admin.findOne({ _id: req.params.id });
    admin.confirmation = req.body.confirmation;
    admin.save();
    console.log(req.body)

    res.status(200);

  } catch (err) {
    res.status(404).json({
      status: 'failed',
      err,
    });
  }
};

exports.editProfile = async (req, res) => {
  try {

    const user = await Admin.findByIdAndUpdate({ _id: req.session.userID }, { // sessiondaki id ile admin şemasındaki id eşleşirse güncelleyecek.
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
    });


    res.status(200).redirect('/profile');
  } catch (error) {
    res.status(404).json({
      status: 'error',
      error: error.message,
    });
  }
};

exports.addPharmacy = async (req, res) => { // eczane bilgisi ekleme
  try {

    await Admin.findById(req.session.userID); // giriş yapan adminin rolünü kontrol etmek için gönderiyoruz.
    await Pharmacy.create(req.body);

    res.status(201).redirect('/pharmacy');

  } catch (error) {
    res.status(404).json({
      status: 'error',
      error: error.message,
    });
  }
};

exports.editPharmacy = async (req, res) => {
  try {

    const pharmacy = await Pharmacy.findByIdAndUpdate({ _id: req.body.selectId }, {
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
      city: req.body.city,
    });


    res.status(200).redirect('/pharmacy');

  } catch (error) {
    res.status(404).json({
      status: 'error',
      error: error.message,
    });
  }
};

exports.selectPharmacy = async (req, res) => {
  try {

    const selectPharmacy = await Pharmacy.findOne({ _id: req.body.oldPharmacyId}); // seçili olanı çağırır
    selectPharmacy.select=false;
    selectPharmacy.save();

    const pharmacy = await Pharmacy.findOne({ _id: req.body.pharmacyId });
    pharmacy.select=true;
    pharmacy.save();


    res.status(200).redirect('/pharmacy');
  } catch (error) {
    res.status(404).json({
      status: 'error',
      error: error.message,
    });
  }
};

exports.deletePharmacy = async (req, res) => {
  try {

    const selectedPharmacy = req.body.selectedId; // seçili id
    const deletePharmacy = req.body.deleteId; // silinecek id;

    if(selectedPharmacy==deletePharmacy){
      res.status(200).send('Seçili eczane silinemez');

    }else{
      await Pharmacy.findByIdAndRemove({ _id: req.params.id}); // seçili olanı çağırır
      res.status(200).redirect('/pharmacy');
    }

  } catch (error) {
    res.status(404).json({
      status: 'error',
      error: error.message,
    });
  }
};
