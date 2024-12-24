import z from "zod";

// Role enum
export const RoleEnum = z.enum(["admin", "student", "teacher"], {
  invalid_type_error: "Role must be either 'admin' or 'student' or 'teacher'",
  message: "Role is required",
});

export type zodRoleEnumType = z.infer<typeof RoleEnum>;

// User schema
export const zodUserSchema = z.object({
  firstName: z.string({
    message: "First name is required",
  }),
  lastName: z.string({
    message: "Last name is required",
  }),
  email: z.string({ message: "email is required" }).email({
    message: "Invalid email address",
  }),
  password: z
    .string({
      message: "Password is required",
    })
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(12, { message: "Password must be less than 12 characters long" }),
  gender: z.enum(["male", "female"], {
    invalid_type_error: "Gender must be either 'male' or 'female'",
  }),
  dateOfBirth: z.string(),
  role: RoleEnum,
  isActive: z.boolean().default(true),
  profilePicture: z.string().url().optional(),
  profilePictureFileId: z.string().optional(),
  phoneNumber: z.string({ message: "phoneNumber is required" }),
  address: z
    .object({
      street: z.string(),
      city: z.string(),
      country: z.string(),
      zipCode: z.string(),
    })
    .optional(),
  isEmailVerified: z.boolean().default(false),
});

export type zodUserSchemaType = z.infer<typeof zodUserSchema>;

// for update user bu admin
export const zodUserUpdateSchema = zodUserSchema.omit({ password: true });
export type zodUserUpdateSchemaType = z.infer<typeof zodUserUpdateSchema>;

// for update user himself
export const zodUserSchemaWithOptionalPassword = zodUserSchema.partial({
  password: true,
});
export type zodUserSchemaWithOptionalPasswordType = z.infer<
  typeof zodUserSchemaWithOptionalPassword
>;

// Sign in schema
export const zodUserSignInSchema = z.object({
  email: z.string({ message: "email is required" }).email({
    message: "Invalid email address",
  }),
  password: z
    .string({
      message: "Password is required",
    })
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(12, { message: "Password must be less than 12 characters long" }),
  role: RoleEnum,
});

export type zodUserSignInSchemaType = z.infer<typeof zodUserSignInSchema>;
