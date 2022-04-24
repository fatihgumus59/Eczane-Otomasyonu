const Admin = require('../models/administration');
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

    // if(req.query.auth=='user'){
    //   const { tc, sifre } = req.body;
    //   const kullanici = User.findOne({ tc }, (err, user) => {
    //     if (user) {
    //       bcrypt.compare(sifre, user.password, (err, same) => {
    //         if (same) {
    //           //veriler eşleşiyor ise
    //           req.session.userID = user._id;
    //           req.session.userName = user.name;
    //           res.status(200).redirect('/');
    //         }
    //       });
    //   }
    // });
    // }

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