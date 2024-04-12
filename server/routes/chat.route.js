import express from "express"
import { userChats } from '../controllers/chat.controller.js';

const router = express.Router()

// router.get('/', createChat);
router.get('/:userId', userChats);
// router.get('/find/:firstId/:secondId', findChat);

export default router