const jwt = require('jsonwebtoken');

const jwtSecret = "howeb3";

const generateToken = ({ id, username }) => {
    return jwt.sign({ id, username }, jwtSecret, { expiresIn: '1h' });
};

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Token is not provided"
        });
    }

    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({
                    message: "Token has expired"
                });
            }
            if (err.name === 'JsonWebTokenError') {
                return res.status(401).json({
                    message: "Token is not valid"
                });
            }
            return res.status(500).json({
                message: "Internal server error"
            });
        }

        req.user = user;
        next();
    });
};

module.exports = {
    generateToken,
    verifyToken
};
