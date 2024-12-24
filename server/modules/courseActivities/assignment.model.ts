import mongoose from "mongoose";
import type {zodAssignmentSchemaType} from "../../shared/zod/courseActivities/assignment";

const assignmentSchema = new mongoose.Schema<zodAssignmentSchemaType>({
    assignment_id: {type: String, required: true},
    course_code: {type: String, required: true},
    instructor_id: {type: String, required: false},
    assignment_title: {type: String, required: true},
    assignment_description: {type: String, required: true},
    due_date: {type: Date, required: true},
    assigment_url: {type: String, required: true},
});

const AssignmentModel = mongoose.model('Assignment', assignmentSchema);

export default AssignmentModel;