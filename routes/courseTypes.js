const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/auth.middleware');

const {
    addCourseType,
    deleteCourseType,
    editCourseType,
    getCourseType,
    getCourseTypes,
} = require('../controllers/courseTypes');

router.post('/', verifyToken, addCourseType);
router.delete('/:id', verifyToken, deleteCourseType);
router.put('/:id', verifyToken, editCourseType);
router.get('/:id', verifyToken, getCourseType);
router.get('/', verifyToken, getCourseTypes);

module.exports = router;