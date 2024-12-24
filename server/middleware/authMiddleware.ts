import type { NextFunction, Response } from "express";
import jsonwebtoken, { type JwtPayload } from "jsonwebtoken";
import "dotenv/config";

const JWT_SECRET = process.env.JWT_SECRET as string;

/**
 * @returns middleware function
 * @description this middleware function checks if the user has cookie if user has cookie,
 * then it will check if the token is valid or not then we add it into the request object as `req.user`
 * */
export const authMiddleware = (req: any, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token;
  // console.log("access_token", token);
  if (!token) {
    res.status(401).json({ message: "Unauthorized - token not found" });
    return;
  }
  const decoded = jsonwebtoken.verify(token, JWT_SECRET) as JwtPayload;
  // console.log("decoded access_token", decoded);
  if (!decoded) {
    res.status(401).json({ message: "Unauthorized - token not valid" });
    return;
  }
  // check if the token is expired
  const current_time = Date.now().valueOf() / 1000;
  if (decoded.exp) {
    if (decoded.exp < current_time) {
      res.status(401).json({ message: "Unauthorized - token expired" });
      return;
    }
  } else {
    res.status(401).json({ message: "Unauthorized - token expired" });
    return;
  }
  console.log({ message: "Request received to authMiddleware" })
  req.user = decoded;
  next();
};
