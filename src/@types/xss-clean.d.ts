// src/types/xss-clean.d.ts

import { Request, Response, NextFunction } from "express";

// Define the type for xss-clean middleware
declare module "xss-clean" {
  // xss-clean middleware function type
  function xssClean(): (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;

  export default xssClean;
}
