import express from 'express';
import { verifyToken } from '../utils/verifyToken.js';
import { create, deleteimage, getimages } from '../Controller/galeriController.js';
import { verifyAdmin } from '../utils/verifyAdmin.js';

const router = express.Router();

router.post('/create', [verifyToken,verifyAdmin], create)
router.get('/getimages', getimages)
router.delete('/deleteimage/:imageId/:userId', [verifyToken,verifyAdmin], deleteimage)
// router.patch('/updateservice/:serviceId/:userId', [verifyToken,verifyAdmin], updateservice)


export default router;