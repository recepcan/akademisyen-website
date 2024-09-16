import  express from 'express';
import  { create,  getTextById,  getTexts, updateText,  } from '../Controller/textsController.js';
import { verifyAdmin } from '../utils/verifyAdmin.js';
import { verifyToken } from '../utils/verifyToken.js';
const router = express.Router();

router.post('/create/',[verifyToken,verifyAdmin],create)
router.get('/getTexts', getTexts);
// router.get('/texts/:textId', getTextById);
router.patch('/update/:textId/:userId',[verifyToken,verifyAdmin],updateText);


export default  router;