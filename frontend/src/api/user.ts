import api from "@/api/index.ts";
import { handleAxiosError } from "@/api/index.ts";
import { z } from "zod";
import {
  zodUserSchema,
  zodUserUpdateSchema,
} from "@shared/zod/user/user.zod.ts";

export const createUser = async (data: z.infer<typeof zodUserSchema>) => {
  try {
    const response = await api.post("/auth/sign-up", data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const updateUser = async ({
  id,
  data,
}: {
  id: string;
  data: z.infer<typeof zodUserUpdateSchema>;
}) => {
  try {
    const response = await api.patch(`/auth/update/user/${id}`, data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const deleteUser = async (id: string) => {
  try {
    const response = await api.delete(`/auth/delete-user/${id}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const response = await api.post(`/auth/user/${email}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const updateMe = async (data: z.infer<typeof zodUserUpdateSchema>) => {
  try {
    const response = await api.patch("/auth/update/me", data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const getAllUsers = async (filter: string = "all") => {
  try {
    const response = await api.get(`/auth/users/?filter=${filter}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};
