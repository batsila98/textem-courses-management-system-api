const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/auth.middleware');

const {
    addLog,
    getLogs,
} = require('../controllers/logs');

router.post('/', verifyToken, addLog);
router.get('/', verifyToken, getLogs);

module.exports = router;