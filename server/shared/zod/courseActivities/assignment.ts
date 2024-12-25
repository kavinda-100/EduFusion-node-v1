import z from 'zod';

export const zodAssignmentSchema = z.object({
    assignment_id: z.string({message: "Assignment id is required"}),
    course_code: z.string({message: "Course code is required"}),
    instructor_id: z.string({message: "Instructor id is required"}).optional(),
    assignment_title: z.string({message: "Title is required"}),
    assignment_description: z.string().optional(),
    due_date: z.string({message: "Due date is required"}),
    assigment_url: z.string({message: "Assignment url is required"}).url({message: "Invalid url"}),
    assignment_url_fileId: z.string({message: "Assignment file id is required"}),
});

export type zodAssignmentSchemaType = z.infer<typeof zodAssignmentSchema>;