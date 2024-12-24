import z from 'zod';

export const zodMessageSchema = z.object({
    student_id: z.string({message: "User id is required"}),
    message: z.string({message: "Message is required"}),
    course_code: z.string({message: "Course code is required"}),
});

export type zodMessageSchemaType = z.infer<typeof zodMessageSchema>;