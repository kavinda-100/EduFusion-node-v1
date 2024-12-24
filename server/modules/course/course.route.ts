import express from "express";
import { authMiddleware } from "../../middleware/authMiddleware";
import { roleMiddleware } from "../../middleware/roleMiddleware";
import { zodMiddleware } from "../../middleware/zodMiddleware";
import {
  createCourse,
  deleteCourse,
  searchCourse,
  updateCourse,
  addUsersToCourse,
  searchUsersInCourse,
  deleteUsersFromCourse,
  updateUsersInCourse,
  getAllCourses,
} from "./course.controller";

import { zodCourseSchema } from "../../shared/zod/course/course";
import { zodAddUpdateUserToCourseSchema } from "../../shared/zod/course";

const router = express.Router();

// * Create course
// edufusion.com/api/v1/course/create
router.post(
  "/create",
  authMiddleware,
  roleMiddleware(["admin"]),
  zodMiddleware(zodCourseSchema),
  createCourse,
);

// * Update course
// edufusion.com/api/v1/course/update/:course_code
router.put(
  "/update/:course_code",
  authMiddleware,
  roleMiddleware(["admin"]),
  zodMiddleware(zodCourseSchema),
  updateCourse,
);

// * Search course
// edufusion.com/api/v1/course/search/:course_code
router.post(
  "/search/:course_code",
  authMiddleware,
  roleMiddleware(["admin"]),
  searchCourse,
);

// * delete course
// edufusion.com/api/v1/course/delete/:course_code
router.delete(
  "/delete/:course_code",
  authMiddleware,
  roleMiddleware(["admin"]),
  deleteCourse,
);

// * Add users to course
// edufusion.com/api/v1/course/add-users
router.post(
  "/add-users",
  authMiddleware,
  roleMiddleware(["admin"]),
  zodMiddleware(zodAddUpdateUserToCourseSchema),
  addUsersToCourse,
);

// * Search users in course
// edufusion.com/api/v1/course/search-users/:user_id/:course_code
router.post(
  "/search-users/:user_id/:course_code",
  authMiddleware,
  roleMiddleware(["admin"]),
  searchUsersInCourse,
);

// * Update users in course
// edufusion.com/api/v1/course/update-users
router.patch(
  "/update-users",
  authMiddleware,
  roleMiddleware(["admin"]),
  zodMiddleware(zodAddUpdateUserToCourseSchema),
  updateUsersInCourse,
);

// * delete users in course
// edufusion.com/api/v1/course/delete-users/:user_id/:course_code
router.delete(
  "/delete-users/:user_id/:course_code",
  authMiddleware,
  roleMiddleware(["admin"]),
  deleteUsersFromCourse,
);

// * Get all courses
// edufusion.com/api/v1/course/get-all-courses
router.get(
  "/get-all-courses",
  authMiddleware,
  roleMiddleware(["admin"]),
  getAllCourses,
);

export default router;
