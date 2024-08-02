import dotenv from "dotenv";
import { Router } from "express";
import welcomeRouteHandler from "./welcome.routes";

dotenv.config();

const router = Router();

// Handle welcome routes
router.use(welcomeRouteHandler);

export const apiRouterHandler = router;
