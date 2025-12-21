import express from 'express';
import { askToAssistant } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const aiRoute = express.Router();

// AI Assistant route - requires authentication
aiRoute.post('/getRespone', authMiddleware, askToAssistant);

export default aiRoute;