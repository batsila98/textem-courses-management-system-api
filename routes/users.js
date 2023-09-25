const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/auth.middleware');

const {
    deleteUser,
    editUser,
    getUser,
    getUsers,
} = require('../controllers/users');

router.delete('/:id', verifyToken, deleteUser);
router.put('/:id', verifyToken, editUser);
router.get('/:id', verifyToken, getUser);
router.get('/', verifyToken, getUsers);

module.exports = router;