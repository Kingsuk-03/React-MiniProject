const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config.js");

function adminMiddleware(req, res, next) {
    const token = req.headers.authorization;

    try {
        const decodedValue = jwt.verify(token, JWT_SECRET);
        if (decodedValue.username) {
            // res.status(200).json({ msg: "Aunthentication Successfull" })
            next();
        } else {
            res.status(403).json({ msg: "Failed! You are not authenticated" })

        }

    } catch (e) {
        res.status(400).json({ msg: "Invalid token" });
    }
}

module.exports = adminMiddleware;