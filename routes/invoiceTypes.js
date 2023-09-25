const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/auth.middleware');

const {
    addInvoiceType,
    deleteInvoiceType,
    editInvoiceType,
    getInvoiceType,
    getInvoiceTypes,
} = require('../controllers/invoiceTypes');

router.post('/', verifyToken, addInvoiceType);
router.delete('/:id', verifyToken, deleteInvoiceType);
router.put('/:id', verifyToken, editInvoiceType);
router.get('/:id', verifyToken, getInvoiceType);
router.get('/', verifyToken, getInvoiceTypes);

module.exports = router;