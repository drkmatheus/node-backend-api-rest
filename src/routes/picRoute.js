import { Router } from "express";

import picController from "../controllers/PicController";
import loginRequired from "../middlewares/loginRequired";

const router = Router();

router.post("/", loginRequired, picController.save);

export default router;
