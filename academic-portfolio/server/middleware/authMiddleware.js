const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        console.log("NO AUTH HEADER")
        return res.status(401).json({ message: "No token" })
    }

    const token = authHeader.split(" ")[1]

    if (!token) {
        console.log("MALFORMED AUTH HEADER:", authHeader)
        return res.status(401).json({ message: "Invalid token format" })
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || "fallbacksecret"
        );

        console.log("DECODED TOKEN:", decoded)

        req.userId = decoded.id || decoded.userId || decoded._id

        if (!req.userId) {
            console.log("NO USER ID IN TOKEN")
            return res.status(401).json({ message: "Invalid token payload" })
        }

        next()
    } catch (err) {
        console.log("TOKEN ERROR:", err.message)
        return res.status(401).json({ message: "Invalid token" })
    }
}