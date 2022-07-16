import { Router } from "express";
import { home } from "../controllers/user";

const router = Router();

router.get("/user", home);

export default router;
