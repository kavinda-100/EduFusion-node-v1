import * as mongoose from "mongoose";

type verificationSchemaType = {
    email: string,
    otp: number,
    token: string,
    isOTP: boolean,
    isToken: boolean,
    createdAt: Date
}

const verificationSchema = new mongoose.Schema<verificationSchemaType>({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: Number,
        required: false
    },
    token: {
        type: String,
        required: false
    },
    isOTP: {
        type: Boolean,
        default: false
    },
    isToken: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // expires in 1 hour
        expires: 3600
    }
})

const verificationModel = mongoose.model("Verification", verificationSchema);

export default verificationModel;