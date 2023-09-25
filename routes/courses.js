const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/auth.middleware');

const {
    addCourse,
    assignTeacher,
    deleteCourse,
    editCourse,
    enrollStudent,
    getCourse,
    getCourses,
    getTotal,
    removeStudent,
    removeTeacher,
} = require('../controllers/courses');

router.post('/', verifyToken, addCourse);
router.get('/total', verifyToken, getTotal);
router.put('/:id/enroll_student', verifyToken, enrollStudent);
router.put('/:id/remove_student', verifyToken, removeStudent);
router.put('/:id/assign_teacher', verifyToken, assignTeacher);
router.put('/:id/remove_teacher', verifyToken, removeTeacher);
router.delete('/:id', verifyToken, deleteCourse);
router.put('/:id', verifyToken, editCourse);
router.get('/:id', verifyToken, getCourse);
router.get('/', verifyToken, getCourses);

module.exports = router;