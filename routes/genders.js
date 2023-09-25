const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/auth.middleware');

const {
    addGender,
    deleteGender,
    editGender,
    getGender,
    getGenders,
} = require('../controllers/genders');

router.post('/', verifyToken, addGender);
router.delete('/:id', verifyToken, deleteGender);
router.put('/:id', verifyToken, editGender);
router.get('/:id', verifyToken, getGender);
router.get('/', verifyToken, getGenders);

module.exports = router;