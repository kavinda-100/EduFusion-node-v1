import type {zodUserSchemaType} from "../zod/user/user.zod.ts";

export type UserType = zodUserSchemaType & {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export type FrontEndResponseType<T> = {
    data: T;
    message: string;
}

export type UserTypeForFrontend = Omit<UserType, "password"> & {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}