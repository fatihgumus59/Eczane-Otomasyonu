const express = require('express');
const multer = require('multer');
const authMiddleware = require('../middlewares/authMiddleware');

const imageStorage = multer.diskStorage({
    destination: 'public/uploads',
    filename: function (req, file, cb) {
        const fullName =
            Date.now() + '-' + file.originalname;
        cb(null, fullName);
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

router.route('/').get(authMiddleware,medicineController.getAllMedicine);
router.route('/api').get(pageController.getAllMedicineApi);
router.route('/ilac-ekle').get(authMiddleware,pageController.getMedicineAddPage);
router.route('/ilac-ekle').post(authMiddleware,imageUpload.single('image'), medicineController.createMedicine);
router.route('/edit/:id').get(authMiddleware,pageController.getEditMedicinePage);
router.route('/:id').put(authMiddleware,imageUpload.single('image'), medicineController.editMedicine);
router.route('/:id').delete(authMiddleware,medicineController.deleteMedicine);

module.exports = router;
