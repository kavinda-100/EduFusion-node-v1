import mongoose from "mongoose";
import type {zodCourseInstructorEnrollmentSchemaType} from "../../shared/zod/course/course.instructor.enrollment";

const courseInstructorEnrollmentSchema = new mongoose.Schema<zodCourseInstructorEnrollmentSchemaType>({
    course_code: {type: String, required: true},
    instructor_id: {type: String, required: true},
    status: {type: String, required: true, enum: ["active", "inactive"], default: "active"},
});

const CourseInstructorEnrollmentModel = mongoose.model<zodCourseInstructorEnrollmentSchemaType>('CourseInstructorEnrollment', courseInstructorEnrollmentSchema);

export default CourseInstructorEnrollmentModel;