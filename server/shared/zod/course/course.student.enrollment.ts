import z from 'zod';

export const zodStatusEnum = z.enum(["enrolled", "dropped", "completed", "failed", "repeat"], {
    message: "Invalid status",
    invalid_type_error: "Invalid status (enrolled, dropped, completed, failed, repeat)"
});

export const zodCourseStudentEnrollmentSchema = z.object({
    course_code: z.string({message: "Course code is required"}),
    student_id: z.string({message: "Student id is required"}),
    status: zodStatusEnum,
});

export type zodCourseStudentEnrollmentSchemaType = z.infer<typeof zodCourseStudentEnrollmentSchema>;