import jsonwebtoken from 'jsonwebtoken';
import type {Response} from "express";
import type {UserType} from "../shared/types";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

/**
 * @description Set cookie for the user when they sign in
 * @param res - Response object
 * @param user - user object
 * @returns  set cookie for the user
 * */
export const setCookie = (res: Response, user: UserType) => {
    const token = jsonwebtoken.sign({
        _id: user._id,
        email: user.email,
        role: user.role
    }, JWT_SECRET, {expiresIn: "1d"});

    res.cookie("access_token", token, {
        httpOnly: true,
        sameSite: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24, // 1 day
    });
}


