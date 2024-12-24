import z from "zod";

export const zodCourseSchema = z.object({
  course_code: z.string({ message: "Course code is required" }),
  course_name: z.string({ message: "Course name is required" }),
  course_description: z.string({ message: "Course description is required" }),
  course_thumbnail: z
    .string({ message: "Course thumbnail is required" })
    .url({ message: "Invalid URL" }),
  course_thumbnail_fileId: z.string({
    message: "Course thumbnail file ID is required",
  }),
  file_urls: z.array(
    z.object({
      file_url: z
        .string({ message: "File URL is required" })
        .url({ message: "Invalid URL" }),
      file_fileId: z.string({ message: "File file ID is required" }),
    }),
  ),
});

export type zodCourseSchemaType = z.infer<typeof zodCourseSchema>;
