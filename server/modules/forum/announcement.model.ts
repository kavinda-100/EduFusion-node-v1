import mongoose from "mongoose";
import type {zodAnnouncementSchemaType} from "../../shared/zod/forum/announcements";

// type zodTypeWithOutInstructorID = Omit<zodAnnouncementSchemaType, "instructor_id" | "course_code">
//
// type announcementSchemaType = zodTypeWithOutInstructorID & {
//     instructor_id: mongoose.Schema.Types.ObjectId;
//     course_code: mongoose.Schema.Types.ObjectId;
// }

const announcementSchema = new mongoose.Schema<zodAnnouncementSchemaType>({
    instructor_id: {type: String, required: true},
    course_code:{type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
});

const AnnouncementModel = mongoose.model<zodAnnouncementSchemaType>('Announcement', announcementSchema);

export default AnnouncementModel;