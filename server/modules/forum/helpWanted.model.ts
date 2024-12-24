import mongoose from "mongoose";
import type {zodHelpWantedSchemaType} from "../../shared/zod/forum/helpWanted";

// type zodTypeStudentID = Omit<zodHelpWantedSchemaType, "student_id" | "course_code">
//
// type helpWantedSchemaType = zodTypeStudentID & {
//     student_id: mongoose.Schema.Types.ObjectId;
//     course_code: mongoose.Schema.Types.ObjectId;
// }

const helpWantedSchema = new mongoose.Schema<zodHelpWantedSchemaType>({
    title: {type: String, required: true},
    description: {type: String, required: true},
    student_id: {type: String, required: true},
    course_code: {type: String, required: true},
});

const helpWantedModel = mongoose.model("HelpWanted", helpWantedSchema);

export default helpWantedModel;