const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET;

exports.verifyToken = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {

        return res.status(401).json({
            message: "Access Denied"
        });

    }

    const token = authHeader.split(" ")[1];

    if (!token) {

        return res.status(401).json({
            message: "Token Missing"
        });

    }

    try {

        const decoded = jwt.verify(token, SECRET_KEY);

        req.user = decoded;

        next();

    } catch (err) {

        return res.status(403).json({
            message: "Invalid Token"
        });

    }

};
exports.isAdmin = (req, res, next) => {

    if (req.user.role !== "admin") {

        return res.status(403).json({
            message: "Admin Access Only"
        });

    }

    next();

};