// import  express from 'express';
// import  { create,getPublications   } from '../Controller/publicationController.js';
// import { verifyAdmin } from '../utils/verifyAdmin.js';
// import { verifyToken } from '../utils/verifyToken.js';

// const router = express.Router();

// router.post('/create',[verifyToken,verifyAdmin],create)
// router.get('/getPublications', getPublications);


// export default  router;

// router.delete('/delete/:publicationId/:userId',[verifyToken,verifyAdmin],deletePublication)
// router.patch('/update/:publicationId/:userId',[verifyToken,verifyAdmin],updatePublication);


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