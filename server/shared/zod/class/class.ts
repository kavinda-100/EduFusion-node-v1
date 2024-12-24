import z from "zod";

export const zodClassSchema = z.object({
  class_code: z.string({ message: "Class code is required" }),
  class_name: z.string({ message: "Class name is required" }),
  instructor_id: z.string({ message: "Instructor is required" }).optional(),
  class_schedule: z.string().url({ message: "Invalid url" }).optional(),
  class_schedule_fileId: z.string().optional(),
  course_codes: z
    .array(
      z.object({
        course_code: z.string(),
      }),
    )
    .default([])
    .optional(),
});

export type zodClassSchemaType = z.infer<typeof zodClassSchema>;
