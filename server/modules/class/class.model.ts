import mongoose from "mongoose";
import type { zodClassSchemaType } from "../../shared/zod/class/class";

const classSchema = new mongoose.Schema<zodClassSchemaType>({
  class_code: { type: String, required: true },
  class_name: { type: String, required: true },
  instructor_id: { type: String, required: false },
  class_schedule: { type: String, required: true },
  class_schedule_fileId: { type: String, required: false },
  course_codes: [
    {
      course_code: { type: String, required: false },
      _id: false,
    },
  ],
});

const ClassModel = mongoose.model("Class", classSchema);

export default ClassModel;
