import z from 'zod';

const zodAttendanceSchema = z.object({
    date: z.date({message: 'Invalid date'}),
    class_code: z.string({message: 'Class code is required'}),
    student_id: z.string({message: 'Student ID is required'}),
    isAttended: z.boolean({message: 'Attendance status is required (true, false)'})
});

export type zodAttendanceType = z.infer<typeof zodAttendanceSchema>;

export default zodAttendanceSchema;

