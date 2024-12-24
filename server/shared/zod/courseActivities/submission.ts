import z from 'zod';

export const zodSubmissionStatusEnum = z.enum(["pending", "submitted", "graded", "overdue"],{
    message: "Invalid status",
    invalid_type_error: "Invalid status must be ('pending', 'submitted', 'graded', or 'overdue')"
});

export const zodCourseActivitySubmissionSchema = z.object({
    course_code: z.string({message: "Course code is required"}),
    student_id: z.string({message: "Student id is required"}),
    assigment_id: z.string({message: "Assignment id is required"}),
    submission_date: z.date(),
    score: z.number().optional(),
    feedback: z.string().optional(),
    submission_url: z.string({message: "Submission url is required"}).url({message: "Invalid url"}),
    status: zodSubmissionStatusEnum,
});

export type zodCourseActivitySubmissionSchemaType = z.infer<typeof zodCourseActivitySubmissionSchema>;