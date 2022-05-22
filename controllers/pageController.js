const QRCode = require('qrcode');

const Medicine = require('../models/medicine');
const Debt = require('../models/debt');
const Admin = require('../models/administration');
const Pharmacy = require('../models/pharmacy');
const Api = require('../models/api');

exports.getIndexPage = async (req, res) => {

  // admin tüm detaylara hakim olabilecek
  const notlarAdmin = await Debt.find({}).limit(4).sort('-createdAt'); // admin tüm notları görebilecek.
  const listAdmin = await Debt.find({}).limit(7).populate('medicine.ilac').sort('-createdAt'); // admin tüm borçluları görebilecek.
  const toplamAdmin = await Debt.find({}).count();
  const odenmemisAdmin = await Debt.where({ status: 'Ödenmedi' }).count().select('status');
  const odenmisAdmin = await Debt.where({ status: 'Ödendi' }).count().select('status');
  const admin = await Admin.findById(req.session.userID);

  const odenmisOranAdmin = (odenmisAdmin * 100) / toplamAdmin;
  const odenmemisOranAdmin = (odenmemisAdmin * 100) / toplamAdmin;
  const borcAlanOranAdmin = ((odenmemisAdmin - odenmisAdmin) / toplamAdmin) * 100;

  //editörde sadece kendi eklediklerini görebilecek.
  const toplam = await Debt.find({ admin: req.session.userID }).count();
  const odenmemis = await Debt.where({ status: 'Ödenmedi', admin: req.session.userID }).count().select('status');
  const odenmis = await Debt.where({ status: 'Ödendi', admin: req.session.userID }).count().select('status');
  const notlar = await Debt.find({ admin: req.session.userID }).limit(4).sort('-createdAt');
  const list = await Debt.find({ admin: req.session.userID }).limit(7).populate('medicine.ilac').sort('-createdAt');

  const odenmisOran = (odenmis * 100) / toplam;
  const odenmemisOran = (odenmemis * 100) / toplam;
  const borcAlanOran = ((odenmemis - odenmis) / toplam) * 100;

  res.status(200).render('index', {
    page_name: "Eczane Otomasyonu",
    toplam,
    odenmemis,
    odenmis,
    odenmisOran,
    odenmemisOran,
    notlar,
    list,
    borcAlanOran: borcAlanOran.toFixed(2),
    admin,
    listAdmin,
    notlarAdmin,
    toplamAdmin,
    odenmemisAdmin,
    odenmisAdmin,
    odenmisOranAdmin,
    odenmemisOranAdmin,
    borcAlanOranAdmin,
    debtAdmin: await Debt.aggregate(
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
    borcAlanOranAdmin: borcAlanOranAdmin.toFixed(2),

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

  const admin = await Admin.findById(req.session.userID);  // ilacı ekleyenin admin olup olmadığını kontrol etmek için gönderiyoruz
  const debt = await Debt.findOne({ _id: req.params.id }).populate('medicine.ilac');
  const allMedicine = await Medicine.find({});

  const id = req.param.id;

  res.status(200).render('edit-debt', {
    page_name: `${debt.name} - Düzenle`,
    debt,
    medicine: allMedicine,
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

  const debt = await Debt.find({ admin: req.session.userID });
  const admin = await Admin.findById(req.session.userID); // giriş yapan adminin rolünü kontrol etmek için gönderiyoruz.
  const debtAdmin = await Debt.find({});

  res.status(200).render('note', {
    page_name: "Notlar",
    debt,
    admin,
    debtAdmin,
  });
};

exports.getProforma = async (req, res) => {

  const debt = await Debt.findOne({ _id: req.params.id }).populate('medicine.ilac');
  const kdv = Number(parseFloat((Number(debt.total) * 8) / 100)).toFixed(2); // virgülden sonra 2 basamak aldı.
  const date = new Date();
  const tarih = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
  const admin = await Admin.findById(req.session.userID);
  const pharmacy = await Pharmacy.findOne({ select: true });

  const url = req.protocol + '://' + req.get('host') + '/invoice/' + req.params.id;
  if (url == 0) return res.send('Url adresi bulunamadı.');

  const qrOption = {
    margin: 0,
    width: 100
  };

  const qrcode = await QRCode.toDataURL(url, qrOption);

  res.status(200).render('proforma', {
    page_name: `${debt.name} `,
    debt,
    kdv,
    total: (Number(debt.total) + Number(kdv)).toFixed(2),
    tarih,
    admin,
    qr: qrcode,
    pharmacy
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


  res.status(200).render('login', {
    page_name: 'Giriş Yap - Ezane Otomasyonu',
    authControl,
  })

}

exports.getRegisterPage = async (req, res) => {

  res.status(200).render('register', {
    page_name: 'Kayıt Ol - Ezane Otomasyonu',
  })

}

exports.getAllAdmin = async (req, res) => {

  const status = req.query.status;
  const admin = await Admin.findById(req.session.userID);
  const user = await Admin.find({});
  const onaysiz = await Admin.where({ confirmation: false });
  const onayli = await Admin.where({ confirmation: true });

  res.status(200).render('admin-list', {
    page_name: 'Tüm Yöneticiler',
    admin,
    user,
    status,
    onaysiz,
    onayli,
  })

}

exports.getAdminAddPage = async (req, res) => {

  const admin = await Admin.findById(req.session.userID); // giriş yapan adminin rolünü kontrol etmek için gönderiyoruz.

  res.status(200).render('user-add', {
    page_name: 'Yönetici Ekle',
    admin,
  })

}

exports.getEditAdminPage = async (req, res) => {

  const admin = await Admin.findById(req.session.userID);
  const user = await Admin.findOne({ _id: req.params.id });

  res.status(200).render('user-edit', {
    page_name: `${admin.name} - Yönetici Düzenle`,
    admin,
    user,
  })

}

exports.getPublicProforma = async (req, res) => {

  const debt = await Debt.findOne({ _id: req.params.id }).populate('medicine.ilac');
  const kdv = Number(parseFloat((Number(debt.total) * 8) / 100)).toFixed(2); // virgülden sonra 2 basamak aldı.
  const date = new Date();
  const tarih = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
  const admin = await Admin.findById(req.session.userID); // giriş yapan adminin rolünü kontrol etmek için gönderiyoruz.
  const tc = debt.tc.replace(debt.tc.substring(4, 9), "*****"); // kimlik numarasını sansürledik.


  const url = req.protocol + '://' + req.get('host') + '/invoice/' + req.params.id;
  if (url == 0) return res.send('Url adresi bulunamadı.');

  const qrOption = {
    margin: 0,
    width: 100
  };

  const qrcode = await QRCode.toDataURL(url, qrOption);

  res.status(200).render('public-proforma', {
    page_name: `${debt.name} `,
    debt,
    kdv,
    total: (Number(debt.total) + Number(kdv)).toFixed(2),
    tarih,
    admin,
    qr: qrcode,
    tc,
  });
};

exports.getProfile = async (req, res) => {

  const admin = await Admin.findById(req.session.userID); // giriş yapan adminin rolünü kontrol etmek için gönderiyoruz.

  res.status(200).render('profile', {
    page_name: `${admin.name} - Profil`,
    admin,
  });
};

exports.getPharmacyPage = async (req, res) => {

  const admin = await Admin.findById(req.session.userID); // giriş yapan adminin rolünü kontrol etmek için gönderiyoruz.
  const adminCount = await Admin.find().count(); // tüm çalışanları listelemek için gönderiyoruz.

  const selectPharmacy = await Pharmacy.findOne({ select: true }); // true olan bir tane var zaten direk onu çağırır

  const pharmacy = await Pharmacy.find({}).sort('-createdAt'); // tablodaki tüm eczaneleri listeler 

  const status = req.query.status;

  res.status(200).render('pharmacy', {
    page_name: `Eczane Bilgileri`,
    admin,
    pharmacy,
    adminCount,
    status,
    selectPharmacy,
  });
};

exports.getApiPage = async (req, res) => {

  const status = req.query.status;

  const api = await Api.find({}).sort('-createdAt').populate('admin');
  const admin = await Admin.findById(req.session.userID); // sayfaya sadece admin girebilecek sorgu işlemi için

  res.status(200).render('api', {
    page_name: 'API',
    admin,
    status,
    api,
  })

}

exports.getEditApiPage = async (req, res) => {

  const status = req.query.status;
  const admin = await Admin.findById(req.session.userID); // sayfaya sadece admin girebilecek sorgu işlemi için
  const selectApi = await Api.findById({ _id: req.params.id })

  res.status(200).render('api', {
    page_name: 'API Düzenle',
    admin,
    status,
    selectApi,
  })

}

