import z from "zod";

/**
 * @description zod schema for reset password
 * */
export const zodResetPasswordSchema = z.object({
  password: z
    .string({
      message: "Password is required",
    })
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(12, { message: "Password must be less than 12 characters long" }),
  otp: z
    .string({ message: "OTP is required" })
    .length(6, { message: "OTP must be 6 characters long" }),
});
/**
 * @description zod type for reset password
 */
export type zodResetPasswordSchemaType = z.infer<typeof zodResetPasswordSchema>;

/**
 * @description zod schema for reset email
 * */
export const zodResetEmailSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Invalid email" }),
  token: z.string({ message: "Token is required" }),
});

/**
 * @description zod type for reset email
 */
export type zodResetEmailSchemaType = z.infer<typeof zodResetEmailSchema>;
