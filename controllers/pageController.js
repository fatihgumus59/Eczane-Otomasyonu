const Medicine = require('../models/medicine');
const Debt = require('../models/debt');
const Admin = require('../models/administration');

exports.getIndexPage = async (req, res) => {

  const toplam = await Debt.find({}).count();
  const odenmemis = await Debt.where({ status: 'Ödenmedi' }).count().select('status');
  const odenmis = await Debt.where({ status: 'Ödendi' }).count().select('status');
  const notlar = await Debt.find({}).limit(4).sort('-createdAt');
  const list = await Debt.find({}).limit(7).populate('medicine.ilac').sort('-createdAt');
  const admin = await Admin.findById(req.session.userID);

  const odenmisOran = (odenmis * 100) / toplam;
  const odenmemisOran = (odenmemis * 100) / toplam;
  const borcAlanOran = ((odenmemis-odenmis)/toplam)*100;

  console.log(req.session.userID);

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
    borcAlanOran : borcAlanOran.toFixed(2),
    admin,
  });
};

exports.getDebtAddPage = async (req, res) => {

  const admin = await Admin.findById(req.session.userID); 
  const medicine = await Medicine.find(req.body);
  res.status(200).render('add-debt', {
    page_name: "Borçlu Ekle",
    medicine,
    admin,
  });
};

exports.getEditDebtPage = async (req, res) => {

  const admin = await Admin.findById(req.session.userID); 
  const debt = await Debt.findOne({ _id: req.params.id }).populate('medicine.ilac');
  const medicine = await Medicine.find({});
  const id = req.param.id;

  res.status(200).render('edit-debt', {
    page_name: `${debt.name} - Düzenle`,
    debt,
    medicine,
    id,
    admin,
  });
};

exports.getMedicineAddPage = async (req, res) => {
  const admin = await Admin.findById(req.session.userID); 
  res.status(200).render('add-medicine', {
    page_name: "Eczane Otomasyonu",
    admin,
  });
};

exports.getEditMedicinePage = async (req, res) => {
  const medicine = await Medicine.findOne({ _id: req.params.id });
  const admin = await Admin.findById(req.session.userID); 
  res.status(200).render('edit-medicine', {
    page_name: "Eczane Otomasyonu",
    medicine,
    admin,
  });
};

exports.getNotesPage = async (req, res) => {

  const debt = await Debt.find({});
  const admin = await Admin.findById(req.session.userID); 
  res.status(200).render('note', {
    page_name: "Notlar",
    debt,
    admin,
  });
};

exports.getProforma = async (req, res) => {

  const debt = await Debt.findOne({ _id: req.params.id }).populate('medicine.ilac');
  const kdv = Number(parseFloat((Number(debt.total) * 8) / 100)).toFixed(2); // virgülden sonra 2 basamak aldı.
  const date = new Date();
  const tarih = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
  const admin = await Admin.findById(req.session.userID); 

  res.status(200).render('proforma', {
    page_name: `${debt.name} `,
    debt,
    kdv,
    total: (Number(debt.total) + Number(kdv)).toFixed(2),
    tarih,
    admin,
  });
};

exports.getAllMedicineApi = async (req, res) => {

  const medicine = await Medicine.find();

  res.status(200).json(medicine);
};

exports.getAllDebtApi = async (req, res) => {

  const debt = await Debt.find();

  res.status(200).json(debt);

}

exports.getLoginPage = async (req, res) => {

  const authControl = req.query.auth; //search alanında parametre vereceğim eğer user gelirse user'a özel login açılmasını sağlayacağım
  // eğer ?auth=admin vb bir şey gelirse admine özel login açılacak.
  

  res.status(200).render('login',{
    page_name: 'Giriş Yap - Ezane Otomasyonu',
    authControl,
  })

}

exports.getRegisterPage = async (req, res) => {

  res.status(200).render('register',{
    page_name: 'Kayıt Ol - Ezane Otomasyonu',
  })

}

exports.getAllAdmin = async (req, res) => {

  const admin = await Admin.findById(req.session.userID);
  const user = await Admin.find({});

  res.status(200).render('admin-list',{
    page_name: 'Tüm Adminler',
    admin,
    user,
  })

}

exports.getAdminAddPage = async (req, res) => {

  const admin = await Admin.findById(req.session.userID); 
  res.status(200).render('admin-add',{
    page_name: 'Admin Ekle',
    admin,
  })

}

exports.getEditAdminPage = async (req, res) => {

  const admin = await Admin.findById(req.session.userID); 
  const user = await Admin.findOne({_id:req.params.id});

  res.status(200).render('user-edit',{
    page_name: 'Adminler',
    admin,
    user,
  })

}
