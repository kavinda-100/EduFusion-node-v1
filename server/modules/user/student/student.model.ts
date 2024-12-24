import mongoose from "mongoose";
import type {zodStudentSchemaType} from "../../../shared/zod/user/student";

type zodTypeWithOutStudentID = Omit<zodStudentSchemaType, "user_id">

type studentSchemaType = zodTypeWithOutStudentID & {
    user_id: mongoose.Schema.Types.ObjectId;
    student_id: string;
}

const studentSchema = new mongoose.Schema<studentSchemaType>({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true},
    student_id: {type: String, required: true},
    class_code: {type: String, required: false},
}, {timestamps: true});

const StudentModel = mongoose.model<studentSchemaType>('Student', studentSchema);

export default StudentModel;