const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/auth.middleware');

const {
    addTeachingFormat,
    deleteTeachingFormat,
    editTeachingFormat,
    getTeachingFormat,
    getTeachingFormats,
} = require('../controllers/courseTeachingFormats');

router.post('/', verifyToken, addTeachingFormat);
router.delete('/:id', verifyToken, deleteTeachingFormat);
router.put('/:id', verifyToken, editTeachingFormat);
router.get('/:id', verifyToken, getTeachingFormat);
router.get('/', verifyToken, getTeachingFormats);

module.exports = router;