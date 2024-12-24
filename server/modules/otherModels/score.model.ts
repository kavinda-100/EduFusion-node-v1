import mongoose from "mongoose";
import type {zodScoreType} from "../../shared/zod/other/score";

const ScoreSchema = new mongoose.Schema<zodScoreType>({
    class_code: {type: String, required: true},
    student_id: {type: String, required: true},
    course_code: {type: String, required: true}, // using course_code can refer to the course name
    score: {type: Number, required: true},
    term: {
        type: String,
        enum: ['first', 'second', 'third'],
        required: true
    }
}, {timestamps: true});

const ScoreModel = mongoose.model('Score', ScoreSchema);

export default ScoreModel;