import z from 'zod';

export const zodAnnouncementSchema = z.object({
    instructor_id: z.string({message: "Instructor is required"}),
    course_code: z.string({message: "Course code is required"}),
    title: z.string({message: "Title is required"}),
    description: z.string({message: "Description is required"}),
});

export type zodAnnouncementSchemaType = z.infer<typeof zodAnnouncementSchema>;