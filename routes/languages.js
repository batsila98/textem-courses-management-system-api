const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/auth.middleware');

const {
    addLanguage,
    deleteLanguage,
    editLanguage,
    getLanguage,
    getLanguages,
} = require('../controllers/languages');

router.post('/', verifyToken, addLanguage);
router.delete('/:id', verifyToken, deleteLanguage);
router.put('/:id', verifyToken, editLanguage);
router.get('/:id', verifyToken, getLanguage);
router.get('/', verifyToken, getLanguages);

module.exports = router;