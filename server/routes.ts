import express from "express";

import AuthRoute from "./modules/auth/auth.route";
import UserRoute from "./modules/user/user.route";
import ClassRoute from "./modules/class/class.route";
import CourseRoute from "./modules/course/course.route";

const router = express.Router();
// Routes
// * route for authentication
//edufusion.com/api/v1/auth
router.use("/auth", AuthRoute);
// * route for user
//edufusion.com/api/v1/user
router.use("/user", UserRoute);
// * route for class
//edufusion.com/api/v1/class
router.use("/class", ClassRoute);
// * route for course
//edufusion.com/api/v1/course
router.use("/course", CourseRoute);

export default router;
