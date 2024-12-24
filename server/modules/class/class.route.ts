import express from "express";

import {
  createClass,
  updateClass,
  deleteClass,
  addStudentToClass,
  updateStudentInClass,
  deleteStudentFromClass,
  getClassCourses,
  getClassByClassCode,
  getAllClasses,
  searchStudentInClass,
} from "./class.controller";
import { authMiddleware } from "../../middleware/authMiddleware";
import { roleMiddleware } from "../../middleware/roleMiddleware";
import { zodMiddleware } from "../../middleware/zodMiddleware";
import { zodClassSchema } from "../../shared/zod/class/class";
import {
  zodClassMemberSchema,
  zodClassMemberSchemaForUpdate,
} from "../../shared/zod/class/class.members";

const router = express.Router();
// http://localhost:5000/api/v1/class/

// * get all classes
// http://localhost:5000/api/v1/class/all
router.get(
  "/all",
  authMiddleware,
  roleMiddleware(["admin", "teacher"]),
  getAllClasses,
);

// * get all courses in a class
// http://localhost:5000/api/v1/class/courses/:class_code
router.get(
  "/courses/:class_code",
  authMiddleware,
  roleMiddleware(["admin", "teacher"]),
  getClassCourses,
);

// * get class by class code
// http://localhost:5000/api/v1/class/:class_code
router.post(
  "/:class_code",
  authMiddleware,
  roleMiddleware(["admin", "teacher"]),
  getClassByClassCode,
);

// * create a new class
// http://localhost:5000/api/v1/class/new
router.post(
  "/new/class",
  authMiddleware,
  roleMiddleware(["admin"]),
  zodMiddleware(zodClassSchema),
  createClass,
);

// * update a class
// http://localhost:5000/api/v1/class/update/:class_code
router.patch(
  "/update/:class_code",
  authMiddleware,
  roleMiddleware(["admin"]),
  zodMiddleware(zodClassSchema),
  updateClass,
);
// * delete a class
// http://localhost:5000/api/v1/class/delete/:class_code
router.delete(
  "/delete/:class_code",
  authMiddleware,
  roleMiddleware(["admin"]),
  deleteClass,
);

// * add a student to class
// http://localhost:5000/api/v1/class/add/student
router.post(
  "/add/student",
  authMiddleware,
  roleMiddleware(["admin"]),
  zodMiddleware(zodClassMemberSchema),
  addStudentToClass,
);

// * update a student in class
// http://localhost:5000/api/v1/class/update/student
router.patch(
  "/update-student",
  authMiddleware,
  roleMiddleware(["admin"]),
  zodMiddleware(zodClassMemberSchemaForUpdate),
  updateStudentInClass,
);

// * search for a student in class
// http://localhost:5000/api/v1/class/search/student
router.post(
  "/search/student/:student_id",
  authMiddleware,
  roleMiddleware(["admin", "teacher"]),
  searchStudentInClass,
);

// * delete a student from class
// http://localhost:5000/api/v1/class/delete/student/:student_id
router.delete(
  "/delete/student/:student_id",
  authMiddleware,
  roleMiddleware(["admin"]),
  deleteStudentFromClass,
);

export default router;
