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
      role:req.body.role
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

    res.status(200).redirect('/auth/manager');

  } catch (err) {
    res.status(404).json({
      status: 'failed',
      err,
    });
  }
};