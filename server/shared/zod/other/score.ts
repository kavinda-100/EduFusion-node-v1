import z from 'zod';

export const TermEnum = z.enum(['first', 'second', 'third'],{
    message: 'term must be first, second or third'
});

export const zodScoreSchema = z.object({
    class_code: z.string({message: 'class_code is required'}),
    student_id: z.string({message: 'student_id is required'}),
    course_code: z.string({message: 'course_code is required'}),
    score: z.number({message: 'score is required'}),
    term: TermEnum
});

export type zodScoreType = z.infer<typeof zodScoreSchema>;
export default zodScoreSchema;

// for list of scores
export const zodScoreListSchema = z.array(zodScoreSchema);

export type zodScoreListType = z.infer<typeof zodScoreListSchema>;

