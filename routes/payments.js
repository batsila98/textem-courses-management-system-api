const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/auth.middleware');

const {
    addPayment,
    deletePayment,
    editPayment,
    getPayment,
    getPayments,
    getTotal,
} = require('../controllers/payments');

router.post('/', verifyToken, addPayment);
router.delete('/:id', verifyToken, deletePayment);
router.get('/total', verifyToken, getTotal);
router.put('/:id', verifyToken, editPayment);
router.get('/:id', verifyToken, getPayment);
router.get('/', verifyToken, getPayments);

module.exports = router;