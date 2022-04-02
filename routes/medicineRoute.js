const express = require('express');
const multer = require('multer')

const imageStorage = multer.diskStorage({
    destination: 'public/uploads',
    filename: (req, file, cb) => {
        cb(null, file.originalname)

    }
});

const imageUpload = multer({
    storage: imageStorage,
    limits: {
        fileSize: 1024 * 1024 * 10 // 10mb
    },

})

const medicineController = require('../controllers/medicineController');
const pageController = require('../controllers/pageController');

const router = express.Router();

router.route('/').get(medicineController.getAllMedicine);
router.route('/ilac-ekle').get(pageController.getMedicineAddPage);
router.route('/ilac-ekle').post(imageUpload.single('image'), medicineController.createMedicine);
router.route('/edit/:id').get(pageController.getEditMedicinePage);
router.route('/:id').put(imageUpload.single('image'),medicineController.getEditMedicine);

module.exports = router;
