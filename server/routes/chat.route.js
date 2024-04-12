import express from "express"
import { createChat, findChat, userChats } from '../controllers/chat.controller.js';

const router = express.Router()

router.post('/', createChat);
router.get('/chats/:userId', userChats); // chaged
router.get('/find/:firstId/:secondId', findChat);

export default router