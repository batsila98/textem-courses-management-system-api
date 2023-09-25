const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/auth.middleware');

const {
    addStatus,
    deleteStatus,
    editStatus,
    getStatus,
    getStatuses,
} = require('../controllers/studentStatuses');

router.post('/', verifyToken, addStatus);
router.delete('/:id', verifyToken, deleteStatus);
router.put('/:id', verifyToken, editStatus);
router.get('/:id', verifyToken, getStatus);
router.get('/', verifyToken, getStatuses);

module.exports = router;