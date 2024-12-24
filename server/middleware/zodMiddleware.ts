import z from "zod";
import type { NextFunction, Request, Response } from "express";
import { errorResponse } from "../lib/responseHandeler";
import { zodIssueError } from "../lib/zod";

//middleware to validate the request body by zod
/**
 * @param schema - zod schema object
 * @returns middleware function
 * @description this middleware function validates the request body by the given zod schema object
 * @throws 406 - if the request body is not valid
 * */
export const zodMiddleware = (schema: z.ZodObject<any, any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log({ message: "Request received with body:", data: req.body })
    try {
      const validatedData = schema.safeParse(req.body);
      if (!validatedData.success) {
        console.error(
          "zodMiddleware: Validation failed: ",
          validatedData.error.errors,
        );
        errorResponse(res, 406, zodIssueError(validatedData.error.errors));
        return;
      } else {
        console.log({ message: "Request received to zodMiddleware" })
        req.body = validatedData.data;
        next();
      }
    } catch (error: any) {
      console.error("zodMiddleware: Error", error);
      errorResponse(res, 400, error.message);
    }
  };
};
