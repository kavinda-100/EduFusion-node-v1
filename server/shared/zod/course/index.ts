import z from "zod";

export const zodStatusEnum = z.enum(
  [
    "enrolled",
    "dropped",
    "completed",
    "failed",
    "repeat",
    "active",
    "inactive",
  ],
  {
    message: "Invalid status",
    invalid_type_error:
      "Invalid status (enrolled, dropped, completed, failed, repeat) for student and (active, inactive) for instructor",
  },
);

export const zodAddUpdateUserToCourseSchema = z.object({
  course_code: z.string({ message: "Course code is required" }),
  user_id: z.string({ message: "user id is required (student or instructor)" }),
  status: zodStatusEnum,
  role: z.enum(["student", "teacher"], {
    message: "Invalid role (student, teacher)",
  }),
});

export type zodAddUpdateUserToCourseType = z.infer<
  typeof zodAddUpdateUserToCourseSchema
>;
