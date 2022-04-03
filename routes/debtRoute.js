const express = require('express');
const pageController = require('../controllers/pageController');
const debtController = require('../controllers/debtController');

const router = express.Router();

router.route('/borc-ekle').get(pageController.getDebtAddPage);
router.route('/borc-ekle').post(debtController.createDebt);


module.exports = router;
