import mongoose from "mongoose";
import type {zodAdminSchemaType} from "../../../shared/zod/user/admin";

type zodAdminSchemaTypeWithOutUserID = Omit<zodAdminSchemaType, "user_id">

type adminSchemaType = zodAdminSchemaTypeWithOutUserID & {
    user_id: mongoose.Schema.Types.ObjectId;
    admin_id: string;
}

const adminSchema = new mongoose.Schema<adminSchemaType>({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true},
    admin_id: {type: String, required: true},
});

const AdminModel = mongoose.model<adminSchemaType>('Admin', adminSchema);

export default AdminModel;