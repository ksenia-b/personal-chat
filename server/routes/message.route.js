import express from 'express';
import  {getMessages}  from '../controllers/message.controller.js';

const router = express.Router();


router.get('/', getMessages);

export default router