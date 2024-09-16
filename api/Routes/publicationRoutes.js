import express from 'express';
import { create, getPublications } from '../Controller/publicationController.js';
import { verifyAdmin } from '../utils/verifyAdmin.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

// Yayın oluşturma route'u (Admin doğrulaması gerektirir)
router.post('/create', [verifyToken, verifyAdmin], create);

// Yayınları getirme route'u (Genel erişime açık)
router.get('/getPublications', getPublications);

export default router;