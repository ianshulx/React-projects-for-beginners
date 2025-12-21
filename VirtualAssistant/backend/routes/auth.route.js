import express from 'express';
import {
    login,
    sendOtp,
    verifyOTP,
    signUP,
    updateProfile,
    getUserProfile,
    logout,
    passwordReset
} from "../controllers/auth.controller.js";
import { authMiddleware } from '../middleware/auth.middleware.js';
import upload from '../middleware/multer.js';

const authRoute = express.Router();

// Public routes (no authentication required)
authRoute.post('/send-otp', sendOtp);
authRoute.post('/verify-otp', verifyOTP);
authRoute.post('/register', signUP);
authRoute.post('/login', login);
authRoute.post('/password-reset', passwordReset);

// Protected routes (require authentication)
authRoute.post('/updateAssistant', authMiddleware, upload.single("assistantImage"), updateProfile);
authRoute.get('/user-profile', authMiddleware, getUserProfile);
authRoute.post('/logout', authMiddleware, logout);

export default authRoute;
