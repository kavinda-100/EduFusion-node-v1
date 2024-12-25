import mongoose from "mongoose";
import type {zodCourseActivitySubmissionSchemaType} from "../../shared/zod/courseActivities/submission";

const courseActivitySubmissionSchema = new mongoose.Schema<zodCourseActivitySubmissionSchemaType>({
    course_code: {type: String, required: true},
    student_id: {type: String, required: true},
    assigment_id: {type: String, required: true},
    submission_date: {type: String, required: true},
    score: {type: Number},
    feedback: {type: String},
    submission_url: {type: String, required: true},
    status: {type: String, required: true, enum: ['pending', 'submitted', 'graded', 'overdue'], default: 'pending'}
});

const SubmissionModel = mongoose.model('Submission', courseActivitySubmissionSchema);

export default SubmissionModel;