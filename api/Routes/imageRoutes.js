import express from 'express';
import { create, getimages } from '../Controller/imageController.js';

const router = express.Router();

router.post("/upload-image", create); // upload middleware'i burada çağırıyoruz
router.get("/get-image", getimages);

export default router;
