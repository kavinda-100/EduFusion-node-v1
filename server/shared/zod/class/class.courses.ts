import z from 'zod';

export const zodClassSchema = z.object({
    class_code: z.string({message: "Class code is required"}),
    course_code: z.string({message: "Course code is required"}),
});

export type zodClassSchemaType = z.infer<typeof zodClassSchema>;