import type { Request, Response } from "express";
import "dotenv/config";
import { errorResponse, successResponse } from "../../../lib/responseHandeler";

// Import the required models
import StudentModel from "../../../modules/user/student/student.model";
import InstructorModel from "../../../modules/user/instructor/instructor.model";
import AttendanceModel from "../../../modules/otherModels/Attendance.model";
import ScoreModel from "../../../modules/otherModels/score.model";
import CourseModel from "../../../modules/course/course.model";
import AssignmentModel from "../../../modules/courseActivities/assignment.model";
import ClassModel from "../../../modules/class/class.model";

type adminStatisticsType = {
  title: string;
  value: string;
};

export const getAdminStatistics = async (req: Request, res: Response) => {
  try {
    // throw new Error("Not implemented");

    const response: adminStatisticsType[] = [];

    // Get total students
    const totalStudents = await StudentModel.countDocuments();
    response.push({
      title: "Total Students",
      value: totalStudents.toString() || "0",
    });

    // Get total instructors
    const totalInstructors = await InstructorModel.countDocuments();
    response.push({
      title: "Total Instructors",
      value: totalInstructors.toString() || "0",
    });

    // Get the attendance average
    const result = await AttendanceModel.aggregate([
      {
        // Group all documents to calculate total and attended counts
        $group: {
          _id: null,
          total: { $sum: 1 },
          attended: { $sum: { $cond: ["$isAttended", 1, 0] } },
        },
      },
      {
        // Project the attendance average as a percentage
        $project: {
          _id: 0,
          attendanceAverage: {
            $multiply: [{ $divide: ["$attended", "$total"] }, 100],
          },
        },
      },
    ]);

    // Extract the attendance average from the result
    const attendanceAverage =
      result.length > 0 ? result[0].attendanceAverage : 0;
    response.push({
      title: "Attendance Average",
      value: attendanceAverage.toString(),
    });

    //Get the exams average
    const examResult = await ScoreModel.aggregate([
      {
        // Group all documents to calculate the total score and count
        $group: {
          _id: null,
          totalScore: { $sum: "$score" },
          count: { $sum: 1 },
        },
      },
      {
        // Project the exam average
        $project: {
          _id: 0,
          examAverage: { $divide: ["$totalScore", "$count"] },
        },
      },
    ]);
    // Extract the exam average from the result
    const examAverage = examResult.length > 0 ? examResult[0].examAverage : 0;
    response.push({ title: "Exams Average", value: examAverage.toString() });

    // Total number of courses
    const totalCourses = await CourseModel.countDocuments();
    response.push({
      title: "Total Courses",
      value: totalCourses.toString() || "0",
    });

    // Total number of assignments
    const totalAssignments = await AssignmentModel.countDocuments();
    response.push({
      title: "Total Assignments",
      value: totalAssignments.toString() || "0",
    });

    // Total number of classes
    const totalClasses = await ClassModel.countDocuments();
    response.push({
      title: "Total Classes",
      value: totalClasses.toString() || "0",
    });

    // Total course materials
    const totalCourseMaterialsResult = await CourseModel.aggregate([
      {
        $unwind: "$file_urls",
      },
      {
        $count: "totalCourseMaterials",
      },
    ]);
    const totalCourseMaterials =
      totalCourseMaterialsResult.length > 0
        ? totalCourseMaterialsResult[0].totalCourseMaterials
        : 0;
    response.push({
      title: "Course Materials",
      value: totalCourseMaterials.toString() || "0",
    });

    successResponse(res, 200, "Admin statistics", response);
  } catch (err: any) {
    errorResponse(res, 500, err.message);
    return;
  }
};

export const getStudentCountBarChartData = async (
  req: Request,
  res: Response,
) => {
  try {
    const students = await StudentModel.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $group: {
          _id: {
            month: { $month: "$user.createdAt" },
            gender: "$user.gender",
          },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id.month",
          male: {
            $sum: {
              $cond: [{ $eq: ["$_id.gender", "male"] }, "$count", 0],
            },
          },
          female: {
            $sum: {
              $cond: [{ $eq: ["$_id.gender", "female"] }, "$count", 0],
            },
          },
        },
      },
      {
        $sort: { _id: 1 },
      },
      {
        $project: {
          _id: 0,
          month: "$_id",
          male: 1,
          female: 1,
        },
      },
    ]);

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const chartData = students.map((item) => ({
      month: monthNames[item.month - 1],
      male: item.male,
      female: item.female,
    }));

    successResponse(res, 200, "Student count bar chart data", chartData);
  } catch (err: any) {
    errorResponse(res, 500, err.message);
    return;
  }
};

export const getAttendanceBarChartData = async (
  req: Request,
  res: Response,
) => {
  try {
    const attendanceData = await AttendanceModel.aggregate([
      {
        $lookup: {
          from: "students",
          localField: "student_id",
          foreignField: "student_id",
          as: "student",
        },
      },
      {
        $unwind: "$student",
      },
      {
        $lookup: {
          from: "users",
          localField: "student.user_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $group: {
          _id: {
            month: { $month: "$date" },
            gender: "$user.gender",
          },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id.month",
          male: {
            $sum: {
              $cond: [{ $eq: ["$_id.gender", "male"] }, "$count", 0],
            },
          },
          female: {
            $sum: {
              $cond: [{ $eq: ["$_id.gender", "female"] }, "$count", 0],
            },
          },
        },
      },
      {
        $sort: { _id: 1 },
      },
      {
        $project: {
          _id: 0,
          month: "$_id",
          male: 1,
          female: 1,
        },
      },
    ]);

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const chartData = attendanceData.map((item) => ({
      month: monthNames[item.month - 1],
      male: item.male,
      female: item.female,
    }));

    successResponse(res, 200, "Attendance bar chart data", chartData);
  } catch (err: any) {
    errorResponse(res, 500, err.message);
    return;
  }
};
