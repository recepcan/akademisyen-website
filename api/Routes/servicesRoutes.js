import express from 'express';
import { verifyToken } from '../utils/verifyToken.js';
import { create, getservices, deleteservice, updateservice } from '../Controller/servicesController.js';
import { verifyAdmin } from '../utils/verifyAdmin.js';

const router = express.Router();

router.post('/create', [verifyToken,verifyAdmin], create)
router.get('/getservices', getservices)
router.delete('/deleteservice/:serviceId/:userId', [verifyToken,verifyAdmin], deleteservice)
router.patch('/updateservice/:serviceId/:userId', [verifyToken,verifyAdmin], updateservice)


export default router;