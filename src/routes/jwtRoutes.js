import Router from "express";
import jwtController from "../controllers/JwtController";

const router = new Router();

router.post("/", jwtController.store);

export default router;
