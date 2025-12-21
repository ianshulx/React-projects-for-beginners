import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Generates JWT token for user authentication
 * @param {Object} user - User object with _id and email
 * @returns {string} - JWT token
 */
const generateToken = (user) => {
    const payload = {
        id: user._id,
        email: user.email,
    };
    return jsonwebtoken.sign(payload, JWT_SECRET, { expiresIn: "10d" });
};

/**
 * Verifies JWT token
 * @param {string} token - JWT token to verify
 * @returns {Object|null} - Decoded token or null if invalid
 */
const verifyToken = (token) => {
    try {
        return jsonwebtoken.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
};

export { generateToken, verifyToken };
