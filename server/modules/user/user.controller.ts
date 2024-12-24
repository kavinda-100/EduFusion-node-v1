import type {Request, Response, NextFunction} from "express";
import "dotenv/config";
import {errorResponse, successResponse} from "../../lib/responseHandeler";
import userModel from "./user.model";

export const getMyProfile = async (req: any, res: Response, next: NextFunction) => {
    const user = req.user;
    try{
        const user = await userModel.findById(req.user._id);
        if(!user){
            errorResponse(res, 404, "User not found");
            return;
        }
        const {password, ...userWithoutPassword} = user.toObject();
        successResponse(res, 200, "User profile", userWithoutPassword);
    }
    catch (error: any) {
        next(error);
    }
}

/**
 * @param req - Request object,
 * @param res - Response object,
 * @param next - NextFunction object
 * @returns  return user profile
 * @description use for get the user profile
 * */
export const getUserProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id;
        //find user by id
        const user = await userModel.findById(userId);
        //check if user exists
        if (!user) {
            errorResponse(res, 404, "User not found");
            return;
        }
        //remove password from a user object
        const {password, ...userWithoutPassword} = user.toObject();
        //send response
        successResponse(res, 200, "User profile", userWithoutPassword);
    } catch (error: any) {
        next(error);
    }
}
