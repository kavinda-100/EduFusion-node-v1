import type { NextFunction, Request, Response } from "express";
import "dotenv/config";

import { successResponse, errorResponse } from "../../lib/responseHandeler";
import ClassModel from "../../modules/class/class.model";
import ClassCoursesModel from "../../modules/class/class.course.model";
import type { zodClassSchemaType } from "../../shared/zod/class/class";
import ClassMemberModel from "../../modules/class/class.members.model";
import type {
  zodClassMemberSchemaForUpdateType,
  zodClassMemberSchemaType,
} from "../../shared/zod/class/class.members";
import { imagekit } from "../../index";

/**
 * @description get all classes
 * @argument {Request} req
 * @argument {Response} res
 * @argument {NextFunction} next
 * @returns {Promise<void>}
 * */
export const getAllClasses = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const allClasses = await ClassModel.aggregate([
      {
        $lookup: {
          from: "classcourses",
          localField: "class_code",
          foreignField: "class_code",
          as: "course_codes",
        },
      },
      {
        $project: {
          _id: 1,
          class_code: 1,
          class_name: 1,
          instructor_id: 1,
          class_schedule: 1,
          class_schedule_fileId: 1,
          "course_codes.course_code": 1,
        },
      },
    ]);
    successResponse(res, 200, "All classes", allClasses);
  } catch (e) {
    next(e);
  }
};

/**
 * @description Create a new class
 * @argument {Request} req
 * @argument {Response} res
 * @argument {NextFunction} next
 * @returns {Promise<void>}
 * */
export const createClass = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const data = req.body as zodClassSchemaType;

  try {
    console.log("Received request to create class:", data);

    // Check if class code already exists
    const classCodeExists = await ClassModel.findOne({
      class_code: data.class_code,
    });
    if (classCodeExists) {
      errorResponse(res, 409, "Class code already exists");
      return;
    }

    // Create a new class
    const newClass = new ClassModel({
      class_code: data.class_code,
      class_name: data.class_name,
      instructor_id: data.instructor_id,
      class_schedule: data.class_schedule,
      class_schedule_fileId: data.class_schedule_fileId,
      course_codes: data.course_codes,
    });
    await newClass.save();
    console.log("New class created:", newClass);

    // Add course codes if available to the class.course_table
    if (data.course_codes && data.course_codes.length > 0) {
      const courseCodes = data.course_codes.map((course_code) => ({
        class_code: data.class_code,
        course_code,
      }));
      await ClassCoursesModel.insertMany(courseCodes);
      console.log("Course codes added:", courseCodes);
    }

    successResponse(res, 201, "Class created successfully", newClass);
  } catch (e) {
    console.error("Error creating class:", e);
    errorResponse(res, 500, "Internal Server Error");
    next(e);
  }
};
/**
 * @description update a class
 * @argument {Request} req
 * @argument {Response} res
 * @argument {NextFunction} next
 * */
export const updateClass = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const data = req.body as zodClassSchemaType;
  const classCode = req.params.class_code;

  try {
    //* check if class exists
    let isClassExists = await ClassModel.findOne({ class_code: classCode });
    if (!isClassExists) {
      successResponse(res, 404, "Class does not exist");
      return;
    }
    //* update class
    await ClassModel.findOneAndUpdate(
      { class_code: classCode },
      {
        $set: {
          class_code: data.class_code || isClassExists.class_code,
          class_name: data.class_name || isClassExists.class_name,
          instructor_id: data.instructor_id || isClassExists.instructor_id,
          class_schedule: data.class_schedule || isClassExists.class_schedule,
          class_schedule_fileId:
            data.class_schedule_fileId || isClassExists.class_schedule_fileId,
          course_codes: data.course_codes || isClassExists.course_codes,
        },
      },
      { new: true },
    );

    //* Delete the old schedule file from the cloud
    if (
      data.class_schedule_fileId &&
      isClassExists.class_schedule_fileId &&
      data.class_schedule_fileId !== isClassExists.class_schedule_fileId
    ) {
      imagekit.deleteFile(
        isClassExists.class_schedule_fileId,
        function (error, result) {
          if (error) console.log("Error deleting file from cloud", error);
          else console.log("File deleted successfully from cloud", result);
        },
      );
    }

    // * update the class_code in the class.course_table
    if (data.course_codes && data.course_codes.length > 0) {
      await ClassCoursesModel.deleteMany({ class_code: classCode });
      const courseCodes = data.course_codes.map((course_code) => ({
        class_code: data.class_code,
        course_code,
      }));
      await ClassCoursesModel.insertMany(courseCodes);
    }

    successResponse(res, 200, "Class updated successfully - " + classCode);
  } catch (e) {
    next(e);
  }
};

/**
 * @description delete a class
 * @argument {Request} req
 * @argument {Response} res
 * @argument {NextFunction} next
 * */
export const deleteClass = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const classCode = req.params.class_code;

  try {
    //check if class exists
    const classCodeExists = await ClassModel.findOne({ class_code: classCode });
    if (!classCodeExists) {
      successResponse(res, 404, "Class does not exist");
      return;
    }
    await Promise.all([
      //delete class
      await ClassModel.deleteOne({ class_code: classCode }),
      //delete all courses related to the class from class.course_table
      await ClassCoursesModel.deleteMany({ class_code: classCode }),
      // delete all students related to the class from class.student_table
      await ClassMemberModel.deleteMany({ class_code: classCode }),
    ]);

    successResponse(
      res,
      200,
      `Class and related courses and students deleted successfully - ${classCode}`,
    );
  } catch (e) {
    next(e);
  }
};

/***
 * @description add a student to a class
 */
export const addStudentToClass = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const data = req.body as zodClassMemberSchemaType;

  try {
    //check if class exists
    const classCodeExists = await ClassModel.findOne({
      class_code: data.class_code,
    });
    if (!classCodeExists) {
      successResponse(res, 404, "Class does not exist");
      return;
    }
    //check if a student exists
    const studentExists = await ClassMemberModel.exists({
      class_code: data.class_code,
      student_id: data.student_id,
    });
    if (studentExists) {
      successResponse(res, 409, "Student already exists in the class");
      return;
    }
    //add a student to class
    const newStudent = new ClassMemberModel({
      class_code: data.class_code,
      student_id: data.student_id,
    });
    await newStudent.save();

    //TODO: sent an email to the student that he/she has been add to the new class

    successResponse(
      res,
      201,
      "Student added to class successfully - " + data.class_code,
    );
  } catch (e) {
    next(e);
  }
};

/**
 * @description update a student in a class
 * */
export const updateStudentInClass = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { class_code, old_student_id, new_student_id } =
    req.body as zodClassMemberSchemaForUpdateType;

  try {
    //check if class exists
    const classCodeExists = await ClassModel.findOne({
      class_code: class_code,
    });
    if (!classCodeExists) {
      successResponse(res, 404, "Class does not exist");
      return;
    }
    //check if a student exists
    const studentExists = await ClassMemberModel.exists({
      class_code: class_code,
      student_id: old_student_id,
    });
    if (!studentExists) {
      successResponse(res, 404, "Student does not exist in the class");
      return;
    }
    //update a student in class
    await ClassMemberModel.updateOne(
      { student_id: old_student_id },
      { class_code: class_code, student_id: new_student_id },
    );

    //TODO: sent an email to the student that he/she has been updated from the class

    successResponse(
      res,
      200,
      "Student updated in class successfully - " + class_code,
    );
  } catch (e) {
    next(e);
  }
};

/**
 * @description search a student from a class
 * */
export const searchStudentInClass = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const studentId = req.params.student_id;
    if (!studentId) {
      errorResponse(res, 400, "Student id is required");
      return;
    }
    //search for a student in a class
    const student = await ClassMemberModel.findOne({ student_id: studentId });

    if (!student) {
      successResponse(res, 404, "Student not found");
      return;
    }
    successResponse(res, 200, `Student found`, student);
  } catch (e) {
    next(e);
  }
};

/**
 * @description delete a student from a class
 * */
export const deleteStudentFromClass = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const student_id = req.params.student_id;

  try {
    //check if a student exists
    const studentExists = await ClassMemberModel.findOne({
      student_id: student_id,
    });
    if (!studentExists) {
      successResponse(res, 404, "Student does not exist in the class");
      return;
    }
    //delete a student from class
    await ClassMemberModel.deleteOne({
      student_id: student_id,
    });

    //TODO: sent an email to the student that he/she has been removed from the class

    successResponse(
      res,
      200,
      "Student deleted from class successfully - " + student_id,
    );
  } catch (e) {
    next(e);
  }
};

/**
 * @description get all courses according to the class code
 * */
export const getClassCourses = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const classCode = req.params.class_code;
    if (!classCode) {
      errorResponse(res, 400, "Class code is required");
      return;
    }
    //check if class exists
    const classCodeExists = await ClassModel.findOne({ class_code: classCode });
    if (!classCodeExists) {
      successResponse(res, 404, "Class does not exist");
      return;
    }
    //get all courses according to the class code
    const classCourses = await ClassCoursesModel.find({
      class_code: classCode,
    });

    successResponse(res, 200, `All courses or ${classCode}`, classCourses);
  } catch (e) {
    next(e);
  }
};

export const getClassByClassCode = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const classCode = req.params.class_code;
    if (!classCode) {
      errorResponse(res, 400, "Class code is required");
      return;
    }
    //check if class exists
    const classCodeExists = await ClassModel.findOne({ class_code: classCode });
    if (!classCodeExists) {
      successResponse(res, 404, "Class does not exist");
      return;
    }

    successResponse(res, 200, `Class found`, classCodeExists);
  } catch (e) {
    next(e);
  }
};
