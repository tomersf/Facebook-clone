import { Router } from "express";
import userRoutes from "./user";

const router = Router();
[userRoutes].forEach((route) => router.use("/", route));
export default router;
