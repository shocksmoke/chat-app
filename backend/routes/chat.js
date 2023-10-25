import express from "express";
import { accessChat,fetchChats,createGroupChat,renameGroup,addRemove} from "../controllers/chat.js";
import { protect } from "../middleware/authMiddleware.js";

const router= express.Router();


router.get('/',protect,fetchChats)
router.post('/',protect,accessChat);

router.post('/group',protect,createGroupChat);
router.post('/rename',protect,renameGroup);
router.post('/addRemove',protect,addRemove);


export default router;