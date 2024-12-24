import z from 'zod';

export const zodStudentSchema = z.object({
    user_id: z.string({message: "User id is required"}),
    class_code: z.string({message: "Class code is required"}),
});

export type zodStudentSchemaType = z.infer<typeof zodStudentSchema>;