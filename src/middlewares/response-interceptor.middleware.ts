import { Request, Response, NextFunction } from "express";

// Extend the Response interface to include responseBody
interface CustomResponse extends Response {
  responseBody?: any; // Adjust type as needed
}

// Middleware function to intercept response body
function responseBodyInterceptor(
  req: Request,
  res: CustomResponse,
  next: NextFunction
): void {
  const originalSend = res.send;

  res.send = function (body: any): Response {
    res.responseBody = body;
    return originalSend.apply(res, [body]);
  };

  next();
}

export default responseBodyInterceptor;
