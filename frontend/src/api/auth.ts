import api, { handleAxiosError } from "@/api/index.ts";
import { z } from "zod";
import { zodUserSignInSchema } from "@shared/zod/user/user.zod.ts";
import {
  zodResetEmailSchema,
  zodResetPasswordSchema,
} from "@shared/zod/validation.zod.ts";

export const getMe = async () => {
  try {
    return await api.get("/user/me");
  } catch (error) {
    handleAxiosError(error);
  }
};

export const signIn = async (data: z.infer<typeof zodUserSignInSchema>) => {
  try {
    return await api.post("/auth/sign-in", data);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const signOut = async () => {
  try {
    const res = await api.post("/auth/sign-out");
    return res.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const askPasswordReset = async () => {
  try {
    const response = await api.get("/auth/ask-reset-password");
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const resetPassword = async (
  data: z.infer<typeof zodResetPasswordSchema>,
) => {
  try {
    const response = await api.patch("/auth/reset-password", data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const askEmailVerification = async () => {
  try {
    const response = await api.get("/auth/ask-email-verification");
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const verifyEmail = async (token: string) => {
  try {
    const response = await api.post(`/auth/verify-email/${token}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const askResetEmail = async () => {
  try {
    const response = await api.get("/auth/ask-email-reset");
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const resetEmail = async (data: z.infer<typeof zodResetEmailSchema>) => {
  try {
    const response = await api.patch("/auth/reset-email", data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};
