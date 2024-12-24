import mongoose from "mongoose";
import type {zodClassMemberSchemaType} from "../../shared/zod/class/class.members";


const classMemberSchema = new mongoose.Schema<zodClassMemberSchemaType>({
    class_code: {type: String, required: true},
    student_id: {type: String, required: true},
});

const ClassMemberModel = mongoose.model('ClassMember', classMemberSchema);

export default ClassMemberModel;