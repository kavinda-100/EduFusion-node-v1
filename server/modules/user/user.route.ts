import express from "express";
import {roleMiddleware} from "../../middleware/roleMiddleware";
import {authMiddleware} from "../../middleware/authMiddleware";
import {getMyProfile, getUserProfile} from "./user.controller";
import AdminRoute from "../../modules/user/admin/admin.route";

const router = express.Router();

//edufusion.com/api/v1/user/me
router.get("/me", authMiddleware, roleMiddleware(["admin", "student", "teacher"]), getMyProfile);
// edufusion.com/api/v1/user/:id
router.get("/profile/:id", authMiddleware, roleMiddleware(["admin", "student", "teacher"]), getUserProfile);

/*************************** Admin Routes **********************************/
// edufusion.com/api/v1/user/admin
router.use("/admin", authMiddleware, roleMiddleware(["admin"]), AdminRoute);

export default router;