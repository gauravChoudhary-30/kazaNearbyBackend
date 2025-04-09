const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateAccessToken = async (data, expiresIn) => {
    return jwt.sign(data, process.env.JWT_SECRET, { expiresIn });
}

const verifyAccessToken = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access token is required.' });
    }
    try {

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid access token.' });
        }
        req.user = decoded;
        next();
    });
} catch(error) {
    return res.status(403).json({ message: 'Invalid access token.' });
}
}

module.exports = {
    generateAccessToken,
    verifyAccessToken
}