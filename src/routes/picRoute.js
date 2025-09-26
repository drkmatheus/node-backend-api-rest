import { Router } from "express";
import multer from "multer";
import picController from "../controllers/PicController";
import multerConfig from "../config/multerConfig";

const router = Router();
const upload = multer(multerConfig);

router.post("/", upload.single("pic"), picController.save);

export default router;
