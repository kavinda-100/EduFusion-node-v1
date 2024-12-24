import mongoose from "mongoose";
import type {zodAttendanceType} from "../../shared/zod/other/attendance";

const AttendanceSchema = new mongoose.Schema<zodAttendanceType>({
    date: {type: Date, required: true,},
    class_code: {type: String, required: true},
    student_id: {type: String, required: true},
    isAttended: {type: Boolean, required: true}
}, {timestamps: true});

const AttendanceModel = mongoose.model('Attendance', AttendanceSchema);

export default AttendanceModel;