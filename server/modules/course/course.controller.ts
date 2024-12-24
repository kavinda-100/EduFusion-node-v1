import type { Request, Response, NextFunction } from "express";
import "dotenv/config";
import type { zodCourseSchemaType } from "../../shared/zod/course/course";
import { successResponse, errorResponse } from "../../lib/responseHandeler";
import CourseModel from "../../modules/course/course.model";
import { imagekit } from "../../index";
import type { zodAddUpdateUserToCourseType } from "../../shared/zod/course";
import StudentModel from "../../modules/user/student/student.model";
import InstructorModel from "../../modules/user/instructor/instructor.model";
import CourseStudentEnrollmentModel from "../../modules/course/course.student.enrollment.model";
import CourseInstructorEnrollmentModel from "../../modules/course/course.instructor.enrollment.model";

export const createCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body as zodCourseSchemaType;

    // check of course code already exists
    const course = await CourseModel.findOne({ course_code: data.course_code });
    if (course) {
      errorResponse(res, 400, "Course code already exists");
      return;
    }
    const newCourse = await CourseModel.create({
      course_code: data.course_code,
      course_name: data.course_name,
      course_description: data.course_description,
      course_thumbnail: data.course_thumbnail,
      course_thumbnail_fileId: data.course_thumbnail_fileId,
      file_urls: data.file_urls,
    });
    await newCourse.save();
    successResponse(res, 201, "Course created successfully", newCourse);
  } catch (error) {
    next(error);
  }
};

export const updateCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { course_code } = req.params;
    const data = req.body as zodCourseSchemaType;
    // code is not provided
    if (!course_code) {
      errorResponse(res, 400, "Course code is required");
      return;
    }
    // check if course exists
    const course = await CourseModel.findOne({ course_code });
    if (!course) {
      errorResponse(res, 404, "Course not found");
      return;
    }
    // update course
    const updatedCourse = await CourseModel.findOneAndUpdate(
      { course_code },
      {
        $set: {
          course_name: data.course_name,
          course_description: data.course_description,
          course_thumbnail: data.course_thumbnail,
          course_thumbnail_fileId: data.course_thumbnail_fileId,
          file_urls: data.file_urls,
        },
      },
      { new: true },
    );
    // delete old course thumbnail
    if (data.course_thumbnail_fileId !== course.course_thumbnail_fileId) {
      imagekit.deleteFile(
        course.course_thumbnail_fileId,
        function (error: unknown, result: unknown) {
          if (error) console.log(error);
          else console.log(result);
        },
      );
    }
    // delete old course files
    course.file_urls.forEach((file) => {
      const fileIndex = data.file_urls.findIndex(
        (f) => f.file_fileId === file.file_fileId,
      );
      if (fileIndex === -1) {
        imagekit.deleteFile(
          file.file_fileId,
          function (error: unknown, result: unknown) {
            if (error) console.log(error);
            else console.log(result);
          },
        );
      }
    });
    // return updated course
    successResponse(res, 200, "Course updated successfully", updatedCourse);
  } catch (error) {
    next(error);
  }
};

export const deleteCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { course_code } = req.params;
    //* code is not provided
    if (!course_code) {
      errorResponse(res, 400, "Course code is required");
      return;
    }
    // * check if course exists
    const course = await CourseModel.findOne({ course_code });
    if (!course) {
      errorResponse(res, 404, "Course not found");
      return;
    }
    // * delete course thumbnail
    imagekit.deleteFile(
      course.course_thumbnail_fileId,
      function (error: unknown, result: unknown) {
        if (error) console.log(error);
        else console.log(result);
      },
    );
    //* delete course files
    course.file_urls.forEach((file) => {
      imagekit.deleteFile(
        file.file_fileId,
        function (error: unknown, result: unknown) {
          if (error) console.log(error);
          else console.log(result);
        },
      );
    });
    //* delete course
    await CourseModel.deleteOne({ course_code });
    successResponse(res, 200, "Course deleted successfully");
  } catch (error) {
    next(error);
  }
};

export const searchCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { course_code } = req.params;
    // code is not provided
    if (!course_code) {
      errorResponse(res, 400, "Course code is required");
      return;
    }
    const course = await CourseModel.findOne({ course_code });
    if (!course) {
      errorResponse(res, 404, "Course not found");
      return;
    }
    successResponse(res, 200, "Course found", course);
  } catch (error) {
    next(error);
  }
};

export const addUsersToCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = req.body as zodAddUpdateUserToCourseType;

    //* check if course exists
    const course = await CourseModel.findOne({ course_code: body.course_code });
    if (!course) {
      errorResponse(res, 404, "Course not found");
      return;
    }
    //* based on role perform checks
    if (body.role === "student") {
      const student = await StudentModel.findOne({ student_id: body.user_id });
      if (!student) {
        errorResponse(res, 404, "Student not found with id " + body.user_id);
        return;
      }
      //* check if user is already added to course
      const studentCourseEnrollment =
        await CourseStudentEnrollmentModel.findOne({
          course_code: body.course_code,
          student_id: body.user_id,
        });
      if (studentCourseEnrollment) {
        errorResponse(res, 400, "Student already added to course");
        return;
      }
      //* create student course enrollment
      const newStudentEnrollment = await CourseStudentEnrollmentModel.create({
        course_code: body.course_code,
        student_id: body.user_id,
        status: body.status,
      });
      await newStudentEnrollment.save();
      //* return success response
      successResponse(
        res,
        201,
        "Student added to course",
        newStudentEnrollment,
      );
      return;
    }

    //* based on role perform checks
    if (body.role === "teacher") {
      //* check if user exists
      const teacher = await InstructorModel.findOne({
        instructor_id: body.user_id,
      });
      if (!teacher) {
        errorResponse(
          res,
          404,
          "Teacher/Instructor not found with id " + body.user_id,
        );
        return;
      }
      //* check if user is already added to course
      const instructorCourseEnrollment =
        await CourseInstructorEnrollmentModel.findOne({
          course_code: body.course_code,
          instructor_id: body.user_id,
        });
      if (instructorCourseEnrollment) {
        errorResponse(res, 400, "Instructor already added to course");
        return;
      }
      //* create instructor course enrollment
      const newInstructorCourseEnrollment =
        await CourseInstructorEnrollmentModel.create({
          course_code: body.course_code,
          instructor_id: body.user_id,
          status: body.status,
        });
      await newInstructorCourseEnrollment.save();
      //* return success response
      successResponse(
        res,
        201,
        "Instructor added to course",
        newInstructorCourseEnrollment,
      );
      return;
    }
  } catch (error) {
    next(error);
  }
};

export const updateUsersInCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = req.body as zodAddUpdateUserToCourseType;

    //* check if course exists
    const course = await CourseModel.findOne({ course_code: body.course_code });
    if (!course) {
      errorResponse(res, 404, "Course not found");
      return;
    }
    //* based on role perform checks
    if (body.role === "student") {
      //* check if student exists
      const student = await StudentModel.findOne({ student_id: body.user_id });
      if (!student) {
        errorResponse(res, 404, "Student not found with id " + body.user_id);
        return;
      }
      //* update student course enrollment
      const updatedStudentEnrollment =
        await CourseStudentEnrollmentModel.findOneAndUpdate(
          {
            course_code: body.course_code,
            student_id: body.user_id,
          },
          {
            $set: {
              status: body.status,
            },
          },
          { new: true },
        );
      //* if a student is not found in any course
      if (!updatedStudentEnrollment) {
        errorResponse(res, 404, "Student not found in any course");
        return;
      }
      //* return success response
      successResponse(res, 200, "Student updated successfully", {
        course_code: updatedStudentEnrollment.course_code,
        status: updatedStudentEnrollment.status,
        user_id: updatedStudentEnrollment.student_id,
      });
    }
    //* based on role perform checks
    if (body.role === "teacher") {
      //* check if instructor exists
      const instructor = await InstructorModel.findOne({
        instructor_id: body.user_id,
      });
      if (!instructor) {
        errorResponse(res, 404, "Instructor not found with id " + body.user_id);
        return;
      }
      //* update instructor course enrollment
      const updatedInstructorEnrollment =
        await CourseInstructorEnrollmentModel.findOneAndUpdate(
          {
            course_code: body.course_code,
            instructor_id: body.user_id,
          },
          {
            $set: {
              status: body.status,
            },
          },
          { new: true },
        );
      //* if an instructor is not found in any course
      if (!updatedInstructorEnrollment) {
        errorResponse(res, 404, "Instructor not found in any course");
        return;
      }
      //* return success response
      successResponse(res, 200, "Instructor updated successfully", {
        course_code: updatedInstructorEnrollment.course_code,
        status: updatedInstructorEnrollment.status,
        user_id: updatedInstructorEnrollment.instructor_id,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteUsersFromCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { user_id, course_code } = req.params;

    //* if code is not provided
    if (!user_id) {
      errorResponse(res, 400, "User id is required");
      return;
    }
    //* if code is not provided
    if (!course_code) {
      errorResponse(res, 400, "Course code is required");
      return;
    }
    //* check if a course exists
    const course = await CourseModel.findOne({ course_code });
    if (!course) {
      errorResponse(res, 404, "Course not found with code " + course_code);
      return;
    }
    //* check if a user is a student
    if (user_id.startsWith("s")) {
      //* check if a student exists
      const student = await CourseStudentEnrollmentModel.findOneAndDelete({
        student_id: user_id,
      });
      if (!student) {
        errorResponse(res, 404, "Student not found with id " + user_id);
        return;
      }
      //* return success response
      successResponse(res, 200, "Student deleted successfully");
      return;
    }
    //* check if a user is an instructor
    if (user_id.startsWith("t")) {
      //* check if an instructor exists
      const instructor = await CourseInstructorEnrollmentModel.findOneAndDelete(
        {
          instructor_id: user_id,
        },
      );
      if (!instructor) {
        errorResponse(res, 404, "Instructor not found with id " + user_id);
        return;
      }
      //* return success response
      successResponse(res, 200, "Instructor deleted successfully");
      return;
    }
  } catch (error) {
    next(error);
  }
};

export const searchUsersInCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { user_id, course_code } = req.params;

    //* if code is not provided
    if (!user_id) {
      errorResponse(res, 400, "User id is required");
      return;
    }
    //* if code is not provided
    if (!course_code) {
      errorResponse(res, 400, "Course code is required");
      return;
    }

    //* check if a course exists
    const course = await CourseModel.findOne({ course_code });
    if (!course) {
      errorResponse(res, 404, "Course not found with code " + course_code);
      return;
    }

    //* check if a user is a student
    if (user_id.startsWith("s")) {
      //* check if a student exists
      const student = await StudentModel.findOne({ student_id: user_id });
      if (!student) {
        errorResponse(res, 404, "Student not found with id " + user_id);
        return;
      }
      //* search for a student in course
      const studentCourseEnrollment =
        await CourseStudentEnrollmentModel.findOne({
          student_id: user_id,
          course_code,
        });
      //* if a student is not found in any course
      if (!studentCourseEnrollment) {
        errorResponse(res, 404, "Student not found in any course");
        return;
      }
      //* return student course enrollment
      successResponse(res, 200, "Student found in courses", {
        course_code: studentCourseEnrollment.course_code,
        status: studentCourseEnrollment.status,
        user_id: studentCourseEnrollment.student_id,
      });
      return;
    }
    //* check if a user is an instructor
    if (user_id.startsWith("t")) {
      //* check if an instructor exists
      const instructor = await InstructorModel.findOne({
        instructor_id: user_id,
      });
      if (!instructor) {
        errorResponse(res, 404, "Instructor not found with id " + user_id);
        return;
      }
      //* search for an instructor in course
      const instructorCourseEnrollment =
        await CourseInstructorEnrollmentModel.findOne({
          instructor_id: user_id,
          course_code,
        });
      //* if an instructor is not found in any course
      if (!instructorCourseEnrollment) {
        errorResponse(res, 404, "Instructor not found in any course");
        return;
      }
      //* return instructor course enrollment
      successResponse(res, 200, "Instructor found in courses", {
        course_code: instructorCourseEnrollment.course_code,
        status: instructorCourseEnrollment.status,
        user_id: instructorCourseEnrollment.instructor_id,
      });
      return;
    }
  } catch (error) {
    next(error);
  }
};

type CourseSchemaType = {
  course_code: string;
  course_name: string;
  course_description: string;
  course_thumbnail: string;
};
export const getAllCourses = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const courses = await CourseModel.find();

    let courseData: CourseSchemaType[] = [];
    courses.forEach((course) => {
      courseData.push({
        course_code: course.course_code,
        course_name: course.course_name,
        course_description: course.course_description,
        course_thumbnail: course.course_thumbnail,
      });
    });

    successResponse(res, 200, "All courses", courseData);
  } catch (error) {
    next(error);
  }
};
