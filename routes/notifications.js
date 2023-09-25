const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/auth.middleware');

const {
    editNotification,
    getNotification,
    getNotifications,
    getTotalUnread,
} = require('../controllers/notifications');

router.put('/:id', verifyToken, editNotification);
router.get('/total_unread', verifyToken, getTotalUnread);
router.get('/:id', verifyToken, getNotification);
router.get('/', verifyToken, getNotifications);

module.exports = router;