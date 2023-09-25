const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/auth.middleware');

const {
    addStudent,
    addCourse,
    deleteStudent,
    editStudent,
    editCourse,
    getStudent,
    getStudents,
    getNumberOfStudentsByCertificates,
    getNumberOfNewStudentsOverPeriod,
    getTotal,
    addCertificate,
} = require('../controllers/students');

router.post('/', verifyToken, addStudent);
router.get('/number_of_students_by_certificates', verifyToken, getNumberOfStudentsByCertificates);
router.get('/number_of_new_students_over_period', verifyToken, getNumberOfNewStudentsOverPeriod);
router.get('/total', verifyToken, getTotal);
router.put('/:id/add_course', verifyToken, addCourse);
router.put('/:id/edit_course', verifyToken, editCourse);
router.put('/:id/add_certificate', verifyToken, addCertificate);
router.delete('/:id', verifyToken, deleteStudent);
router.put('/:id', verifyToken, editStudent);
router.get('/:id', verifyToken, getStudent);
router.get('/', verifyToken, getStudents);

module.exports = router;