import z from 'zod';

export const zodInstructorStatusEnum = z.enum(["active", "inactive"], {
    message: "Invalid status",
    invalid_type_error: "Invalid status (active, inactive)"
});

export const zodCourseInstructorEnrollmentSchema = z.object({
    course_code: z.string({message: "Course code is required"}),
    instructor_id: z.string({message: "Instructor id is required"}),
    status: zodInstructorStatusEnum
});

export type zodCourseInstructorEnrollmentSchemaType = z.infer<typeof zodCourseInstructorEnrollmentSchema>;