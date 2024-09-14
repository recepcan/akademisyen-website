import express from 'express';
import { verifyToken } from '../utils/verifyToken.js';
import { create, deletepost, getposts, updatepost } from '../Controller/postsController.js';
import { verifyAdmin } from '../utils/verifyAdmin.js';

const router = express.Router();

router.post('/create', [verifyToken,verifyAdmin], create)
router.get('/getposts', getposts)
router.delete('/deletepost/:postId/:userId', [verifyToken,verifyAdmin], deletepost)
router.patch('/updatepost/:postId/:userId', [verifyToken,verifyAdmin], updatepost)


export default router;