import { Router } from "express";
import welcomeRouteHandler from "./welcome.routes";

const router = Router();

// Handle welcome routes
router.use(welcomeRouteHandler);

export const apiRouterHandler = router;
