import express from 'express'
import { sendMessage } from '../Controller/contactController.js'
const router = express.Router();

router.post('/message',sendMessage)


export default router ;