const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { loginValidation, registerValidation } = require('../utils/validation/users');
const {
    addToTokensList,
    generateAccessToken,
    generateRefreshToken,
    updateTokens,
} = require('../services/tokenService');

const login = async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error) {
        return res.status(400).json(...error.details);
    }

    const user = await User.findOne({ username: req.body.username });
    if (!user) {
        return res.status(404).json({ message: 'User is not exist!' });
    }

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
        return res.status(400).json({ message: 'Invalid password!' });
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    addToTokensList(accessToken, refreshToken);

    res.json({
        'accessToken': accessToken,
        'refreshToken': refreshToken,
        'user': user,
    });
};

const register = async (req, res) => {
    const { error } = registerValidation(req.body);
    if (error) {
        return res.status(400).json(...error.details);
    }

    const userExist = await User.findOne({ username: req.body.username });
    if (userExist) {
        return res.status(409).json({ message: 'A user with this username already exists!' });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User(req.body);
    user.password = hashPassword;

    try {
        const userSaved = await user.save();
        res.json(userSaved);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const tokenRefresh = async (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
        return res.status(403).json({ message: 'Token is required' });
    }

    const udatedToken = updateTokens(refreshToken);
    if (udatedToken.error) {
        return res.status(406).json({ message: udatedToken.error });
    }

    res.json({ accessToken: udatedToken.accessToken });
};

module.exports = {
    login,
    register,
    tokenRefresh,
};