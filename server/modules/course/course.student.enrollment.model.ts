import mongoose from "mongoose";
import type {zodCourseStudentEnrollmentSchemaType} from "../../shared/zod/course/course.student.enrollment";


const courseStudentEnrollmentSchema = new mongoose.Schema<zodCourseStudentEnrollmentSchemaType>({
    course_code: {type: String, required: true},
    student_id: {type: String, required: true},
    status: {type: String, required: true, enum: ["enrolled", "dropped", "completed", "failed", "repeat"], default: "enrolled"},
});

const CourseStudentEnrollmentModel = mongoose.model<zodCourseStudentEnrollmentSchemaType>('CourseStudentEnrollment', courseStudentEnrollmentSchema);

export default CourseStudentEnrollmentModel;