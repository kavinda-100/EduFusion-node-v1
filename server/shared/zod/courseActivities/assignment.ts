import z from 'zod';

export const zodAssignmentSchema = z.object({
    assignment_id: z.string({message: "Assignment id is required"}),
    course_code: z.string({message: "Course code is required"}),
    instructor_id: z.string({message: "Instructor id is required"}).optional(),
    assignment_title: z.string({message: "Title is required"}),
    assignment_description: z.string().optional(),
    due_date: z.date(),
    assigment_url: z.string({message: "Assignment url is required"}).url({message: "Invalid url"}),
});

export type zodAssignmentSchemaType = z.infer<typeof zodAssignmentSchema>;