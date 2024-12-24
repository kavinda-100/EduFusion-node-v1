import type { zodRoleEnumType } from "../shared/zod/user/user.zod.ts";
import type { Response, NextFunction } from "express";

/**
 * @param role - array of roles that are allowed to access the route
 * @returns  return Middleware
 * @description Middleware to check if the user has the required role to access the route
 * */
export const roleMiddleware = (role: zodRoleEnumType[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    console.log({ message: "Request received to roleMiddleware" })
    const userRole = req.user.role;
    if (role.includes(userRole)) {
      next();
    } else {
      res.status(403).json({
        message: "You don't have permission to access this route",
      });
    }
  };
};
