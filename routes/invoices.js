const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/auth.middleware');

const {
    addInvoice,
    deleteInvoice,
    editInvoice,
    getInvoice,
    getInvoices,
    getTotal,
} = require('../controllers/invoices');

router.post('/', verifyToken, addInvoice);
router.delete('/:id', verifyToken, deleteInvoice);
router.get('/total', verifyToken, getTotal);
router.put('/:id', verifyToken, editInvoice);
router.get('/:id', verifyToken, getInvoice);
router.get('/', verifyToken, getInvoices);

module.exports = router;