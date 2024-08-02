import httpStatus from "http-status";
import { Router, Request, Response } from "express";
import { apiRouterHandler } from "./api";
import messages from "../config/messages.config";
import { wrapResponse } from "../utils/response-wrapper";

const router = Router();

const currentApiVersion = process.env.API_VERSION || "v1";

// Handle API routes
router.use(`/api/${currentApiVersion}`, apiRouterHandler);

// Index route
router.get("/", (req: Request, res: Response) => {
  wrapResponse(res, {
    statusCode: httpStatus.OK,
    message: messages.app.all_ok,
  });
});

// 404 handler
router.use((req: Request, res: Response) => {
  wrapResponse(res, {
    statusCode: httpStatus.NOT_FOUND,
    message: messages.app.errors.page_not_found,
  });
});

export const applicationRouteHandler = router;
