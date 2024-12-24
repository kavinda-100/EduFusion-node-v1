import express from "express";
import {
  signUp,
  signIn,
  signOut,
  resetPassword,
  askResetPassword,
  askEmailVerification,
  verifyEmail,
  askEmailReset,
  resetEmail,
  tempoSignUp,
  deleteUser,
  updateMe,
  getUserByEmail,
  updateUser,
  getAllUsers,
} from "./auth.controller";
import { zodMiddleware } from "../../middleware/zodMiddleware";
import {
  zodUserSchema,
  zodUserSignInSchema,
  zodUserUpdateSchema,
} from "../../shared/zod/user/user.zod";
import { roleMiddleware } from "../../middleware/roleMiddleware";
import { authMiddleware } from "../../middleware/authMiddleware";
import {
  zodResetPasswordSchema,
  zodResetEmailSchema,
} from "../../shared/zod/validation.zod";

const router = express.Router();

// ////////////////////
// * this route is for admin only and only used for testing and development
// edufusion.com/api/v1/auth/admin/sign-up
router.post("/admin/sign-up", zodMiddleware(zodUserSchema), signUp);
router.post("/admin/tempo-sign-up", tempoSignUp);
// //////////////////////

// * sign up
//edufusion.com/api/v1/auth/sign-up
router.post(
  "/sign-up",
  authMiddleware,
  roleMiddleware(["admin"]),
  zodMiddleware(zodUserSchema),
  signUp,
);
// * sign in
//edufusion.com/api/v1/auth/sign-in
router.post("/sign-in", zodMiddleware(zodUserSignInSchema), signIn);
// * sign out
//edufusion.com/api/v1/auth/sign-out
router.post("/sign-out", signOut);

// * ask forgot password
//edufusion.com/api/v1/auth/ask-reset-password
router.get(
  "/ask-reset-password",
  authMiddleware,
  roleMiddleware(["admin", "student", "teacher"]),
  askResetPassword,
);
// * reset password
//edufusion.com/api/v1/auth/reset-password
router.patch(
  "/reset-password",
  authMiddleware,
  roleMiddleware(["admin", "student", "teacher"]),
  zodMiddleware(zodResetPasswordSchema),
  resetPassword,
);
// * ask to verify email
//edufusion.com/api/v1/auth/ask-email-verification
router.get(
  "/ask-email-verification",
  authMiddleware,
  roleMiddleware(["admin", "student", "teacher"]),
  askEmailVerification,
);
// * verify email
//edufusion.com/api/v1/auth/verify-email/:token
router.post(
  "/verify-email/:token",
  authMiddleware,
  roleMiddleware(["admin", "student", "teacher"]),
  verifyEmail,
);
// * ask to reset email
//edufusion.com/api/v1/auth/ask-email-reset
router.get(
  "/ask-email-reset",
  authMiddleware,
  roleMiddleware(["admin", "student", "teacher"]),
  askEmailReset,
);
// * reset email
//edufusion.com/api/v1/auth/reset-email/:token
router.patch(
  "/reset-email",
  authMiddleware,
  roleMiddleware(["admin", "student", "teacher"]),
  zodMiddleware(zodResetEmailSchema),
  resetEmail,
);
// * delete user
//edufusion.com/api/v1/auth/delete-user/:id
router.delete(
  "/delete-user/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  deleteUser,
);

// * update me
//edufusion.com/api/v1/auth/update/me
router.patch(
  "/update/me",
  authMiddleware,
  roleMiddleware(["admin", "student", "teacher"]),
  zodMiddleware(zodUserUpdateSchema),
  updateMe,
);
// * update user
//edufusion.com/api/v1/auth/update/user/:id
router.patch(
  "/update/user/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  zodMiddleware(zodUserUpdateSchema),
  updateUser,
);
// * get user by email
// edufusion.com/api/v1/auth/user/:email
router.post(
  "/user/:email",
  authMiddleware,
  roleMiddleware(["admin"]),
  getUserByEmail,
);
// * get all users
// edufusion.com/api/v1/auth/users/?filter=all | ?filter=admin | ?filter=student | ?filter=teacher
router.get("/users", authMiddleware, roleMiddleware(["admin"]), getAllUsers);

export default router;
