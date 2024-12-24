import mongoose from "mongoose";
import type { zodClassSchemaType } from "../../shared/zod/class/class.courses";

const classCoursesSchema = new mongoose.Schema<zodClassSchemaType>({
  class_code: { type: String, required: true },
  course_code: { type: String, required: true },
});

const ClassCoursesModel = mongoose.model("ClassCourse", classCoursesSchema);

export default ClassCoursesModel;
