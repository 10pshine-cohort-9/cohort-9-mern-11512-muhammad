import jwt from "jsonwebtoken"
import "dotenv/config";

export const authenticate = (req, res, next) => {
    const auth_header = req.headers.authorization;
    
    if (!auth_header) {
        return res.status(401).json({ message: "Access deenied" })
    }

    const token = auth_header.split(" ")[1];

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user
        next()

    } catch (error)
    {
        console.error(error);

        return res.status(401).json({
        "message": "Invalid token"
        })
    }
};