import { Router } from "express";

import picController from "../controllers/PicController";

const router = Router();

router.post("/", picController.save);

export default router;
