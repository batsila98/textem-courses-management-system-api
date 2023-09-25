const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).send('Access denied! Needs token!');
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token!' });
    }
}

module.exports = { verifyToken };