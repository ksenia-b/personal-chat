import express from "express"
import { users } from '../controllers/user.controller.js';

const router = express.Router()

// router.get('/', createChat);
router.get('/:userId', Users);
// router.get('/find/:firstId/:secondId', findChat);

export default router