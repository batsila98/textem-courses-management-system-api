const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/auth.middleware');

const {
    addTeacher,
    deleteTeacher,
    editTeacher,
    getTeacher,
    getTeachers,
    getTopTeachers,
    getTotal,
} = require('../controllers/teachers');

router.post('/', verifyToken, addTeacher);
router.get('/total', verifyToken, getTotal);
router.get('/top', verifyToken, getTopTeachers);
router.delete('/:id', verifyToken, deleteTeacher);
router.put('/:id', verifyToken, editTeacher);
router.get('/:id', verifyToken, getTeacher);
router.get('/', verifyToken, getTeachers);

module.exports = router;