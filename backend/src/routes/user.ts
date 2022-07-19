import { Router } from "express";
import { activateAccount, register, login } from "../controllers/user";

const router = Router();

router.post("/register", register);
router.post("/activate", activateAccount);
router.post("/login", login);

export default router;
