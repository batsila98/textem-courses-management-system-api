const express = require('express');
const router = express.Router();

const {
    login,
    register,
    tokenRefresh,
} = require('../controllers/auth');

router.post('/login', login);
router.post('/register', register);
router.post('/tokenRefresh', tokenRefresh);

module.exports = router;