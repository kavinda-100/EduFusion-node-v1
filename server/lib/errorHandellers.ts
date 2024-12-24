import type { Request, Response, NextFunction } from "express";

// middleware to handle errors
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log({ message: "errorHandler", error: err.stack })
  console.log({ message: "errorHandler", error: err.message })
  res.status(500).json({ message: "Internal Server Error" });
  next();
};
