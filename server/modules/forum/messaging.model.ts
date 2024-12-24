import mongoose from "mongoose";
import type {zodMessageSchemaType} from "../../shared/zod/forum/messaging";


const messageSchema = new mongoose.Schema<zodMessageSchemaType>({
    student_id: {type: String, required: true},
    message: {type: String, required: true},
    course_code: {type: String, required: true},
});

const messageModel = mongoose.model('Message', messageSchema);

export default messageModel;