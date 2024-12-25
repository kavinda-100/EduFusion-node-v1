import z from 'zod';

export const zodHelpWantedSchema = z.object({
    title: z.string({message: "Title is required"}),
    description: z.string({message: "Description is required"}),
    student_id: z.string({message: "Student id is required"}),
    course_code: z.string({message: "Course code is required"}),
});

export type zodHelpWantedSchemaType = z.infer<typeof zodHelpWantedSchema>;

export const zodHelpWantedReplySchema = z.object({
    title: z.string({message: "Title is required"}),
    description: z.string({message: "Description is required"}),
    instructor_id: z.string({message: "Instructor id is required"}),
    username: z.string({message: "Student username is required"}),
});

export type zodHelpWantedReplySchemaType = z.infer<typeof zodHelpWantedReplySchema>;