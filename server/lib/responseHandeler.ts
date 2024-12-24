import type {Response} from "express";

export const successResponse = (res: Response, statusCode: number, message: string, data?: any | any[]) => {
    return res.status(statusCode).json({
        message,
        data,
    });
}

export const errorResponse = (res: Response, statusCode: number, error: string) => {
    return res.status(statusCode).json({
        error
    });
}