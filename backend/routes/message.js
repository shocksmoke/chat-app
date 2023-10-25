import express from "express";
import { createMessage,allMessages} from "../controllers/message.js";
import { protect } from "../middleware/authMiddleware.js";

const router= express.Router();


router.post('/',protect,createMessage)
router.get('/:chatId',protect,allMessages);


export default router;