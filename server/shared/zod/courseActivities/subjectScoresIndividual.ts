import z from 'zod';

export const zodSubjectScoresIndividualSchema = z.object({
    student_id: z.string({message: "Student id is required"}),
    class_code: z.string({message: "Class code is required"}),
    course_code: z.string({message: "Course code is required"}),
    score: z.number({message: "Score is required"}).min(0,{message: "Minimum score should be zero."}).max(100, {message: "Maximum score should be hundred."}),
});

export type zodSubjectScoresIndividualSchemaType = z.infer<typeof zodSubjectScoresIndividualSchema>;