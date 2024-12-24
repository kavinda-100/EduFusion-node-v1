import mongoose from "mongoose";
import type {zodCourseActivitySubmissionSchemaType} from "../../shared/zod/courseActivities/submission";

type zodWithoutCourseCode = Omit<zodCourseActivitySubmissionSchemaType, "assignment_id">;

type courseActivitySubmissionSchemaType = zodWithoutCourseCode & {
    assignment_id: string
}

const courseActivitySubmissionSchema = new mongoose.Schema<courseActivitySubmissionSchemaType>({
    course_code: {type: String, required: true},
    student_id: {type: String, required: true},
    assignment_id: {type: String, required: true},
    submission_date: {type: Date, required: true},
    score: {type: Number},
    feedback: {type: String},
    submission_url: {type: String, required: true},
    status: {type: String, required: true, enum: ['pending', 'submitted', 'graded', 'overdue'], default: 'pending'}
});

const SubmissionModel = mongoose.model('Submission', courseActivitySubmissionSchema);

export default SubmissionModel;