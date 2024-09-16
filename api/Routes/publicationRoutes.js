
import express from 'express';
import { create, getPublications } from '../Controller/publicationController.js';
import { verifyAdmin } from '../utils/verifyAdmin.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/create', [verifyToken, verifyAdmin], create);

router.get('/getPublications', getPublications);

export default router;