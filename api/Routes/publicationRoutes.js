import express from 'express';
import { create, deletepublication, getPublicationById, getPublications, updatePublication } from '../Controller/publicationController.js';
import { verifyAdmin } from '../utils/verifyAdmin.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

// Yayın oluşturma route'u (Admin doğrulaması gerektirir)
router.post('/create', [verifyToken, verifyAdmin], create);

// Yayınları getirme route'u (Genel erişime açık)
router.get('/getPublications', getPublications);
router.delete('/deletePublication/:publicationId/:userId', [verifyToken,verifyAdmin], deletepublication)
router.get('/getPublication/:publicationId', getPublicationById);
router.patch('/updatePublication/:publicationId', [verifyToken, verifyAdmin], updatePublication);

export default router;