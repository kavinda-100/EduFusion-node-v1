import mongoose from "mongoose";
import type { zodCourseSchemaType } from "../../shared/zod/course/course";

const courseSchema = new mongoose.Schema<zodCourseSchemaType>({
  course_code: { type: String, required: true },
  course_name: { type: String, required: true },
  course_description: { type: String, required: true },
  course_thumbnail: { type: String, required: true },
  course_thumbnail_fileId: { type: String, required: true },
  file_urls: [
    {
      file_url: { type: String, required: true },
      file_fileId: { type: String, required: true },
    },
  ],
});

const CourseModel = mongoose.model("Course", courseSchema);

export default CourseModel;
