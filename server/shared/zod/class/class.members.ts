import z from "zod";

export const zodClassMemberSchema = z.object({
  class_code: z.string({ message: "Class code is required" }),
  student_id: z.string({ message: "Student id is required" }),
});

export type zodClassMemberSchemaType = z.infer<typeof zodClassMemberSchema>;

export const zodClassMemberSchemaForUpdate = z.object({
  class_code: z.string({ message: "Class code is required" }),
  old_student_id: z.string({ message: "Old Student id is required" }),
  new_student_id: z.string().optional(),
});

export type zodClassMemberSchemaForUpdateType = z.infer<
  typeof zodClassMemberSchemaForUpdate
>;
