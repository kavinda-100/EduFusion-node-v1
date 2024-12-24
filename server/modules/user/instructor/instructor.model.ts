import mongoose from "mongoose";
import type {zodInstructorSchemaType} from "../../../shared/zod/user/instructor";

type zodTypeWithoutInstructorID = Omit<zodInstructorSchemaType, "user_id">

type instructorSchemaType = zodTypeWithoutInstructorID & {
    user_id: mongoose.Schema.Types.ObjectId
    instructor_id: string
}

const instructorSchema = new mongoose.Schema<instructorSchemaType>({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    instructor_id: {type:String, required: true},
    class_code: {type:String, required: false},
});

const InstructorModel = mongoose.model<instructorSchemaType>('Instructor', instructorSchema);

export default InstructorModel;