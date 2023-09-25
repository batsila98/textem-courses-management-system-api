const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/auth.middleware');

const {
    addCertificate,
    deleteCertificate,
    editCertificate,
    getCertificate,
    getCertificates,
} = require('../controllers/certificates');

router.post('/', verifyToken, addCertificate);
router.delete('/:id', verifyToken, deleteCertificate);
router.put('/:id', verifyToken, editCertificate);
router.get('/:id', verifyToken, getCertificate);
router.get('/', verifyToken, getCertificates);

module.exports = router;