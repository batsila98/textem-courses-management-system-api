const jwt = require('jsonwebtoken');
const tokensList = {};

const addToTokensList = (accessToken, refreshToken) => {
    tokensList[refreshToken] = {
        status: 'loggedin',
        accessToken: accessToken,
        refreshtoken: refreshToken,
    };
};

const generateAccessToken = (userID) => {
    const accessToken = jwt.sign(
        { _id: userID },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: '5m' }
    );

    return accessToken;
};

const generateRefreshToken = (userID) => {
    const accessToken = jwt.sign(
        { _id: userID },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '30d' }
    );

    return accessToken;
};

const updateTokens = (refreshToken) => {
    if (!(refreshToken in tokensList)) {
        return { error: 'No token in a list!' };
    }

    try {
        const verified = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
            if (err) {
                return { error: 'Unauthorized' };
            } else {
                const accessTokenNew = generateAccessToken(decoded._id);
                tokensList[refreshToken].accessToken = accessTokenNew;
                return { accessToken: accessTokenNew };
            }
        });

        return verified;
    } catch (err) {
        return { error: 'Verification error!' };
    }
};

module.exports = {
    addToTokensList,
    generateAccessToken,
    generateRefreshToken,
    updateTokens,
};