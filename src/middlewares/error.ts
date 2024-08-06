import { NextFunction, Request, Response } from "express";

interface customError extends Error {
  status?: number;
  message: string;
}

const errorMiddleware = (
  err: customError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  err.message ||= "Internal sever error";
  err.status ||= 500;

  const response = {
    success: false,
    message: err.message,
  };

  return res.status(err.status).json(response);
};

const TryCatch =
  (
    passedFunc: (
      req: Request,
      res: Response,
      next: NextFunction,
    ) => Promise<void>,
  ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await passedFunc(req, res, next);
    } catch (error) {
      next(error);
    }
  };

export { TryCatch, errorMiddleware };
