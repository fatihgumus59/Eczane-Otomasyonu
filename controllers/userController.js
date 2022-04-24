const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
  try {
    const user = await User.create({
      ...req.body,
      password: req.body.tc,
      admin: req.session.userID,
    });

    console.log(req.body.tc);
    res.status(201).redirect('/kullanicilar');
  } catch (error) {
    res.status(404).json({
      status: 'error',
      error: error.message,
    });
  }
};

// exports.loginUser = async (req, res) => {
//   try {
//     const { tc, password } = req.body;
//     const users = User.findOne({ tc }, (err, user) => {
//       if (user) {
//         bcrypt.compare(password, user.password, (err, same) => {
//           if (same) {
//             //veriler eşleşiyor ise
//             req.session.userID = user._id;
//             res.status(200).redirect('/');
//           }
//         });
//       }
//     });

//   } catch (error) {
//     res.status(404).json({
//       status: 'error',
//       error: error.message,
//     });
//   }
// };

exports.editUser = async (req, res) => {
  try {

    const user = await User.findByIdAndUpdate({ _id: req.params.id }, {
      name: req.body.name,
      tc: req.body.tc,
    });


    res.status(200).redirect('/kullanicilar');
  } catch (error) {
    res.status(404).json({
      status: 'error',
      error: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {

    const user = await User.findByIdAndRemove({ _id: req.params.id });

    res.status(200).redirect('/kullanicilar');

  } catch (error) {
    res.status(404).json({
      status: 'error',
      error: error.message,
    });
  }
};


