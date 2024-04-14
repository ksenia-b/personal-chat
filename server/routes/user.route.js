import express from "express"
import { getAllUsers } from '../controllers/user.controller.js';

const router = express.Router()

// router.get('/', createChat);
// router.get('/:userId', Users);
router.get('/',getAllUsers)
// router.get('/find/:firstId/:secondId', findChat);

export default router
