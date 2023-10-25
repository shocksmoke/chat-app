import express from "express";
import { login ,register,findUsers} from "../controllers/user.js";
import upload from "../config/multer.js";
import { protect } from "../middleware/authMiddleware.js";

const router= express.Router();

router.get('/',protect,findUsers);

router.post('/register',upload.single('picture'),register);
router.post('/login',login);



export default router;